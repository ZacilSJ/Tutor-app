import { Component, OnInit } from '@angular/core';
import { Lectura } from 'src/app/core/models/lectura.model';
import { LecturasService } from 'src/app/core/service/lecturas.service';

@Component({
  selector: 'app-recomender',
  templateUrl: './recomender.component.html',
  styleUrls: ['./recomender.component.css']
})
export class RecomenderComponent implements OnInit {

  lectura: Lectura[] = []; // todas las lecturas
  seleccionado: Lectura[] = []; // lecturas seleccionadas a mostrar

  constructor(private lecturaServicio: LecturasService) { }

  ngOnInit() {
    // Trae todas las lecturas del servicio
    this.lectura = this.lecturaServicio.getAllLecturas();
    this.seleccionado = this.lectura; // por ahora mostramos todas
  }

  clickLectura(id: string): void {
    alert('Lectura selecionadada' + id);
    console.log('lectura seleccionada:', id);

  }
}

