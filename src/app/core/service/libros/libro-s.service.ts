// similar a prueba.components.ts donde se muestra la miniatura
import { Injectable } from '@angular/core';
import {Libro} from '../../models/libro.model';

@Injectable({
  providedIn: 'root'
})
// Aquí se manda a llamar el detalle del libro
export class LibroSService {
  libros: Libro[] = [
    {
       id: '1',
       imagen: 'assets/imagenes/libroazul.jpg',
       title: 'The Awakening and Selected Short Stories',
       autor: 'Kate Chopin (service)',
       text: 'http://localhost/Tutor/assets/libros/160.html'
     },
     {
       id: '2',
       imagen: 'assets/imagenes/libromorado.jpg',
       title: 'Mosses from an Old Manse and Other Stories',
       autor: 'Nathaniel Hawthorne',
       text: 'http://localhost/Tutor/assets/libros/512.html'
     },
     {
       id: '3',
       imagen: 'assets/imagenes/libroazulito.jpg',
       title: 'The Fall of the House of Usher',
       autor: 'Edgar Allan Poe',
       text: 'http://localhost/Tutor/assets/libros/932.html'
     },
     /*{
      id: '4',
      imagen: 'assets/imagenes/pg35997.cover.medium.jpg',
      title: 'The Jungle Book                          ',
      autor: 'Rudyard Kipling',
      text: 'Another trial to mirror student level'
    },
    {
      id: '5',
      imagen: 'assets/imagenes/pg375.cover.medium.jpg',
      title: 'An Ocurrence at Owl Creek',
      autor: 'Ambrose Bierce',
      text: 'Another trial to mirror student level'
    },
    {
      id: '6',
      imagen: 'assets/imagenes/pg902.cover.medium.jpg',
      title: 'The Happy Prince and Other Tales',
      autor: 'Oscar Wilde',
      text: 'Another trial to mirror student level'
    },*/
   ];

  constructor() { }

  getAllLibros(){
    return this.libros;
  }

  getLibro(id: string){
    return this.libros.find(item => id === item.id);
  }
}
