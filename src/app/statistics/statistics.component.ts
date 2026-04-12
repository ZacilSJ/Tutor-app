import Chart from 'chart.js/auto';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  usuario: string = '';

  // referencia al canvas
  @ViewChild('grafica') canvasRef!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    const id = sessionStorage.getItem('ident');

    if (!id) {
      console.error("No hay usuario en sesión");
      return;
    }

    this.http.get<any>('assets/lecturas/statistics-api.php?idUsuario=' + id)
      .subscribe({
        next: (res) => {

          console.log("DATOS:", res);

          this.usuario = res.usuario;

          // esperar a que el canvas exista
          setTimeout(() => {
            this.crearGrafica(res.labels, res.data);
          }, 100);
        },
        error: (err) => {
          console.error("Error al cargar estadísticas:", err);
        }
      });
  }

  crearGrafica(labels: any[], data: any[]) {

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error("No se pudo obtener el contexto del canvas");
      return;
    }

    // scroll dinámico si hay muchas barras
    if (labels.length > 15) {
      canvas.style.width = (labels.length * 50) + "px";
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Porcentaje obtenido',
          data: data,
          borderWidth: 1,
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      },
      options: {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        autoSkip: false,
        maxRotation: 60,
        minRotation: 45,
        font: {
          size: 14
        }
      }
    },
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 10
      }
    }
  }
}
    });
  }
}