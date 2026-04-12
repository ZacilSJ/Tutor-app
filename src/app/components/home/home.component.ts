import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Statistics';
  temaResult = '';
  statistics: any;

  constructor(private apiservice: DataApiService) { }

  ngOnInit(): void {
    this.getMaterias();
    this.getDominio();
    this.getTutor();
    this.getTema();
    this.getStatistics();
  }

  getMaterias(){
    this.apiservice.getAllMateria().subscribe((res: any) => {
      console.log(res);
    });
  }

  getDominio(){
    this.apiservice.getAllDominio().subscribe((res: any) => {
      console.log(res);
    });
  }

  getTutor(){
    this.apiservice.getAlltutor().subscribe((res: any) => {
      console.log(res);
    });
  }

  getTema(){
    this.apiservice.getAllTema().subscribe((res: any) => {
      console.log(res);
    });
  }


  getStatistics(idUsuario?: string){
    const id = sessionStorage.getItem('ident');

    if(!id){
      console.error("No hay usuario logueado");
      return;
    }

    this.apiservice.getStatistics(id!).subscribe((res: any) => {
      this.statistics = res;
      console.log("STATS:", this.statistics);
    });
  }

}