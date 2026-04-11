import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EstrategiaService } from 'src/app/core/service/estrategia.service';
import { Estrategia } from 'src/app/core/models/estrategia.model';

@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styleUrls: ['./estrategias.component.css']
})
export class EstrategiasComponent implements OnInit {

  @Output() estrategiaClicked: EventEmitter<any> = new EventEmitter();
  estrategia: Estrategia[] = [];

  constructor(private estrategiasService: EstrategiaService) { }

  ngOnInit() {
    this.getAllEstrategias();
  }

  getAllEstrategias() {
    this.estrategia = this.estrategiasService.getAllEstrategias();
  }

  getEstrategia(id: number) {
    this.estrategiaClicked.emit(this.estrategia.find(e => e.id === id));
  }

  clickEstrategia(id: number) {
    console.log("Estrategia seleccionada:", id);
  }
}
