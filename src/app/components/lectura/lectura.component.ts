import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Lectura } from '../../core/models/lectura.model';

@Component({
  selector: 'app-lectura',
  templateUrl: './lectura.component.html',
  styleUrls: ['./lectura.component.css']
})

export class LecturaComponent {

  idsBloqueados: string[] = ['4497', '5511', '6631'];

  @Input() lectura!: Lectura;
  @Output() lecturaClicked = new EventEmitter<Lectura>();

  //constructor(private router: Router) {}

  onStart(): void  {
    // Esto emite el evento al componente padre
    //console.log('CLICK EN LECTURA:', this.lectura.id);
    this.lecturaClicked.emit(this.lectura);

    // Esto hace la redirección a otra ruta, ejemplo: '/lectura/:id'
    //this.router.navigate(['/lectura', this.lectura.id]);
  }
}
