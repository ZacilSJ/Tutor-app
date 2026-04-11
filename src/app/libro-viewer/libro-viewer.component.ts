import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroSService } from '../core/service/libros/libro-s.service';
import { Libro } from '../core/models/libro.model';
import { AfterViewInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-libro-viewer',
  templateUrl: './libro-viewer.component.html',
  styleUrls: ['./libro-viewer.component.scss']
})
export class LibroViewerComponent implements OnInit, AfterViewInit {

  libro!:Libro;
  libroUrl: string = '';
  //bookContent: string = '';

  // referencia al iframe
  @ViewChild('iframeLibro') iframeLibro!: ElementRef;

  constructor(
    private route: ActivatedRoute ,
    private libroService: LibroSService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      const libro = this.libroService.getLibro(id);
      if (libro){
        this.libro = libro;
        this.libroUrl = libro.text; // Asegúrate de que 'text' contenga la URL correcta del libro
        console.log("URL del libro:", this.libroUrl);
      }
    }
  }

  //  marcador de lectura
  ngAfterViewInit(){

    const iframe = this.iframeLibro.nativeElement;

    iframe.onload = () => {

      const posicionGuardada = localStorage.getItem("marcadorLibro");

      if(posicionGuardada){
        iframe.contentWindow.scrollTo(0, Number(posicionGuardada));
      }

      iframe.contentWindow.addEventListener("scroll", () => {

        const scrollActual = iframe.contentWindow.scrollY;

        localStorage.setItem("marcadorLibro", scrollActual.toString());

      });

    }

  }

}



//import { Component, OnInit } from '@angular/core';

//@Component({
 // selector: 'app-libro-viewer',
  //templateUrl: './libro-viewer.component.html',
  //styleUrls: ['./libro-viewer.component.css']
//})
//export class LibroViewerComponent implements OnInit {

 // constructor() { }

 // ngOnInit(): void {
  //}

//}
