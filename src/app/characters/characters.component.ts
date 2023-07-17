import { Component, OnInit, ViewChild } from '@angular/core';
import { CharactersService } from '../characters.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  personajes: any[] = [];
  personajeSeleccionado: any;
  personajeAleatorio: any;

  @ViewChild('personajeDetailsModal') personajeDetailsModal: any;
  @ViewChild('editpersonajeModal') editpersonajeModal: any;
  @ViewChild('crearpersonajeModal') crearpersonajeModal: any;
  @ViewChild('eliminarpersonajeModal') eliminarpersonajeModal: any;
  @ViewChild('personajeAleatorioDetailsModal') personajeAleatorioDetailsModal: any;

  constructor(private charactersService: CharactersService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.charactersService.getCharacters().subscribe(
      (response: any) => {
        this.personajes = response;
      }
    );
  }

  abrirPersonajeDetallesModal(character: any) {
    this.personajeSeleccionado = character;
    this.modalService.open(this.personajeDetailsModal, { centered: true });
  }

  abrirPersonajeEditarModal(character: any) {
    this.personajeSeleccionado = JSON.parse(JSON.stringify(character));
    this.modalService.open(this.editpersonajeModal, { centered: true });
  }

  abrirPersonajeCrearModal() {
    this.personajeSeleccionado = {};
    this.modalService.open(this.crearpersonajeModal, { centered: true });
  }

  abrirPersonajeEliminarModal(character: any) {
    this.personajeSeleccionado = character;
    this.modalService.open(this.eliminarpersonajeModal,{centered: true});
  }

  crearPersonaje() {
    this.charactersService.crearPersonaje(this.personajeSeleccionado).subscribe(
      (response: any) => {
        console.log('Personaje creado', response);
        this.modalService.dismissAll();
        this.getCharacters();
      },
      error => {
        console.log('Error al crear el personaje', error);
      }
    );
  }

  actualizarPersonaje() {
    this.charactersService.actualizarPersonaje(this.personajeSeleccionado.id, this.personajeSeleccionado).subscribe(
      (response: any) => {
        console.log('Personaje actualizado', response);
        this.modalService.dismissAll();
        this.getCharacters();
      },
      error => {
        console.log('Error al eliminar el personaje', error);
      }
    );
  }

  eliminarPersonaje() {
    this.charactersService.eliminarPersonaje(this.personajeSeleccionado.id).subscribe(
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

  abrirPersonajeAleatorioModal() {
    this.charactersService.getCharacters().subscribe(
      (response: any) => {
        console.log(response);
        const cantidadPersonajes = response.length;
        const IDRandom = Math.floor(Math.random() * cantidadPersonajes) + 1;
        this.charactersService.getCharacterById(IDRandom).subscribe(
          (character: any) => {
            this.personajeAleatorio = character;
            console.log(this.personajeAleatorio);
            this.modalService.open(this.personajeAleatorioDetailsModal, { centered: true });
          }
        );
      }
    );
  }
}
