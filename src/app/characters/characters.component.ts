import { Component, OnInit, ViewChild } from '@angular/core';
import { CharactersService } from '../characters.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: any[] = [];
  selectedCharacter: any;

  @ViewChild('characterDetailsModal') characterDetailsModal: any;
  @ViewChild('editCharacterModal') editCharacterModal: any;
  @ViewChild('createCharacterModal') createCharacterModal: any;
  @ViewChild('deleteCharacterModal') deleteCharacterModal: any;

  constructor(private charactersService: CharactersService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.charactersService.getCharacters().subscribe(
      (response: any) => {
        this.characters = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  openCharacterDetailsModal(character: any) {
    this.selectedCharacter = character;
    this.modalService.open(this.characterDetailsModal, { centered: true });
  }

  openEditCharacterModal(character: any) {
    this.selectedCharacter = JSON.parse(JSON.stringify(character));
    this.modalService.open(this.editCharacterModal, { centered: true });
  }

  openCreateCharacterModal() {
    this.selectedCharacter = {};
    this.modalService.open(this.createCharacterModal, { centered: true });
  }
  

  createCharacter() {
    this.charactersService.createCharacter(this.selectedCharacter).subscribe(
      (response: any) => {
        console.log('Personaje creado', response);
        this.modalService.dismissAll();
        this.getCharacters(); // Actualizar la lista de personajes después de la creación
      },
      error => {
        console.log('Error al crear el personaje', error);
      }
    );
  }
  

  updateCharacter() {
    this.charactersService.updateCharacter(this.selectedCharacter.id, this.selectedCharacter).subscribe(
      (response: any) => {
        console.log('Personaje actualizado', response);
        this.modalService.dismissAll();
        this.getCharacters(); // Actualizar la lista de personajes después de la actualización
      },
      error => {
        console.log('Error al eliminar el personaje', error);
      }
    );
  }

  openDeleteCharacterModal(character: any) {
    this.selectedCharacter = character;
    this.modalService.open(this.deleteCharacterModal, { centered: true });
  }

  deleteCharacter() {
    this.charactersService.deleteCharacter(this.selectedCharacter.id).subscribe(
      (response: any) => {
        console.log('Personaje eliminado', response);
        this.modalService.dismissAll();
        this.getCharacters();
      },
      error => {
        console.log('Error al eliminar personaje', error);
      }
    );
  }
}
