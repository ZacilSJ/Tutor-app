import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  usuario: string = '';

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

    this.http.get<any>('https://tutor-app.fwh.is/assets/lecturas/statistics.php?idUsuario=' + id)
      .subscribe({
        next: (res) => {

            console.log("DATOS:", res);

 
  if (!res || !res.labels || !res.data) {
    console.error("Respuesta inválida del servidor", res);
    return;
  }

  this.usuario = res.usuario;

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

    // VALIDAR QUE CHART EXISTA
    const ChartJS = (window as any).Chart;

    if (!ChartJS) {
      console.error("Chart no está cargado");
      return;
    }

    // scroll dinámico
    if (labels.length > 15) {
      canvas.style.width = (labels.length * 50) + "px";
    }

    // CREAR GRÁFICA
    new ChartJS(ctx, {
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
          xAxes: [{
            ticks: {
              autoSkip: false,
              maxRotation: 60,
              minRotation: 45,
              fontSize: 14
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 100,
              stepSize: 10
            }
          }]
        }
      }
    });
  }
}