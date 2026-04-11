import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {LibroSService} from '../../../core/service/libros/libro-s.service';
import { Libro } from '../../../core/models/libro.model';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-libro-detail',
  templateUrl: './libro-detail.component.html',
  styleUrls: ['./libro-detail.component.css']
})
export class LibroDetailComponent implements OnInit {

  libro: Libro;
  //public safeSrc: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private libroSService: LibroSService,
  // private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.libro = this.libroSService.getLibro(id);
      //this.safeSrc=this.sanitizer.bypassSecurityTrustResourceUrl(this.libro.text)
    });
  }
}
//Funcion inecesaria, sólo para probar

function sumar(valor1:number, valor2:number): number {
  return valor1+valor2;
}
console.log(sumar(10, 5));

