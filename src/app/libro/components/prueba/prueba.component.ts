import { Component, OnInit } from '@angular/core';
import {Libro} from '../../../core/models/libro.model';

@Component({
  selector: 'app-prueba',
  templateUrl:'./prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

    libros: Libro[]=[
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
      },  ]

  constructor() { }
  ngOnInit(): void {
  }

/*
  addItem(): void {
    this.items.push(this.title);
  }
  deleteItem(index: number): void {
    this.items.splice(index, 1);
  }*/

  clickLibro(id: string): void {
  console.log('Libro clickeado:', id);
}

  }

