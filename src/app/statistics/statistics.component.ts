import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var Chart: any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  usuario: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    const id = sessionStorage.getItem('ident');

    this.http.get<any>(`https://tutor-app.fwh.is/assets/lecturas/statistics-api.php?idUsuario=${id}`)
   // this.http.get<any>('http://localhost/tutor/api/statistics.php')
      .subscribe(res => {

        console.log(res); // para verificar

  this.usuario = res.usuario;

  
  setTimeout(() => {
    this.crearGrafica(res.labels, res.data);
  }, 200);
      });
  }

  crearGrafica(labels: any[], data: any[]) {

    const canvas = document.getElementById('graficaGeneral') as HTMLCanvasElement;

    // Scroll dinámico
    if (labels.length > 15) {
      canvas.style.width = (labels.length * 50) + "px";
    }

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Porcentaje obtenido',
          data: data,
          borderWidth: 1,
          barPercentage: 0.85,
          categoryPercentage: 0.8
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 60,
              minRotation: 45,
              font: { size: 14 }
            }
          },
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 10 }
          }
        }
      }
    });
  }
}