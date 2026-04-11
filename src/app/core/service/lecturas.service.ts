import { Injectable } from '@angular/core';
import {Lectura} from '../models/lectura.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
//Aquí manda a llamar el detalle de la lectura
export class LecturasService {
  url='../front1/assets/';
  lecturas: Lectura[]=[
    
    {id:'5197', title:"Hannah's story", FKGL:'3.21', RDL2:'34.19', imagen:'assets/imagenes/HANNAH.jpg', href: 'assets/lecturas/cuestionario_5197.htm', archivo: 'cuestionario_5197.htm'},//quizás falla por el apostrofe
    {id:'5119',title:'My routine',FKGL:'4.2',RDL2:'34',imagen:'assets/imagenes/My_Rutine.jpg', href: 'assets/lecturas/cuestionario_5119.htm', archivo: 'cuestionario_5119.htm'},
    {id:'5429',title:'Dear Mr. Jackson',FKGL:'4.56',RDL2:'29.38',imagen:'assets/imagenes/jackson.jpg', href: 'assets/lecturas/cuestionario_5429.htm', archivo: 'cuestionario_5429.htm'},
    {id:'4417',title:'What do you do with your free time',FKGL:'4.85',RDL2:'29.33',imagen:'assets/imagenes/free_time.jpg' , href: 'assets/lecturas/cuestionario_4417.htm', archivo: 'cuestionario_4417.htm'},
    {id:'5013',title:"Malcoms trip",FKGL:'6.09',RDL2:'27.81',imagen:'assets/imagenes/trips.jpg' , href: 'assets/lecturas/cuestionario_5013.htm', archivo: 'cuestionario_5013.htm'},
    {id:'5225',title:"Frank's story",FKGL:'5.1',RDL2:'26.86',imagen:'assets/imagenes/frak.jpg' , href: 'assets/lecturas/cuestionario_5225.htm', archivo: 'cuestionario_5225.htm'},
    {id:'5511',title:'Mark',FKGL:'2.46',RDL2:'26.7',imagen:'assets/imagenes/mark.jpg' , href: 'assets/lecturas/cuestionario_5511.htm', archivo: 'cuestionario_5511.htm'},
    {id:'4497',title:'Samantha Daily',FKGL:'5.95',RDL2:'26.58',imagen:'assets/imagenes/SAM.jpg' , href: 'assets/lecturas/cuestionario_4497.htm', archivo: 'cuestionario_4497.htm'},
    {id:'5392',title:'Noelle from Ireland',FKGL:'4.08',RDL2:'25.43',imagen:'/assets/imagenes/NOELLE.jpg' , href: 'assets/lecturas/cuestionario_5392.htm',archivo: 'cuestionario_5392.htm'},
    {id:'4969',title:'Lenas email',FKGL:'2.71',RDL2:'25.18',imagen:'assets/imagenes/email.jpg' , href: 'assets/lecturas/cuestionario_4969.htm', archivo: 'cuestionario_4969.htm'},
    {id:'6631',title:'Best Body Fitness',FKGL:'5.03',RDL2:'24.99',imagen:'assets/imagenes/FITNESS.jpg' , href: 'assets/lecturas/cuestionario_6631.htm', archivo: 'cuestionario_6631.htm'},
    {id:'5417',title:'Tired Bored',FKGL:'3.25',RDL2:'22.33',imagen:'assets/imagenes/tired.jpg' , href: 'assets/lecturas/cuestionario_5417.htm', archivo: 'cuestionario_5417.htm' },
    {id:'6627',title:'Professional profile summaries',FKGL:'9.16',RDL2:'21.31',imagen:'assets/imagenes/profesional.jpg' , href: 'assets/lecturas/cuestionario_6627.htm', archivo: 'cuestionario_6627.htm'},
    {id:'6631',title:'Study skill tips',FKGL:'4.99',RDL2:'21.19',imagen:'assets/imagenes/Study.jpg'  , href: 'assets/lecturas/cuestionario_6632.htm', archivo: 'cuestionario_6632.htm'},
    {id:'5574',title:'Social media influencers',FKGL:'7.52',RDL2:'20.17',imagen:'assets/imagenes/socialmedia.jpg' , href: 'assets/lecturas/cuestionario_5574.htm', archivo: 'cuestionario_5574.htm'},
    {id:'5139',title:'Maria Kochetkova',FKGL:'9.98',RDL2:'19.03',imagen:'assets/imagenes/Mariako.jpg'  , href: 'assets/lecturas/cuestionario_5139.htm', archivo: 'cuestionario_5139.htm'},
    {id:'5004',title:'My neighborhood',FKGL:'7.87',RDL2:'18.76',imagen:'assets/imagenes/vecinos.jpg' , href: 'assets/lecturas/cuestionario_5004.htm', archivo: 'cuestionario_5004.htm'},
    {id:'5108',title:'Meals in Britian',FKGL:'4.65',RDL2:'18.31',imagen:'assets/imagenes/MEALS.jpg'  , href: 'assets/lecturas/cuestionario_5108.htm', archivo: 'cuestionario_5108.htm'},
    {id:'5000',title:'World Markeers',FKGL:'6.17',RDL2:'16.39',imagen:'assets/imagenes/MARKEERS.jpg' , href: 'assets/lecturas/cuestionario_5000.htm', archivo: 'cuestionario_5000.htm'},
    {id:'4410',title:'Jennifer Lopez',FKGL:'6.68',RDL2:'14.54',imagen:'assets/imagenes/jenniferlopez.jpg' , href: 'assets/lecturas/cuestionario_4410.htm', archivo: 'cuestionario_4410.htm'},
    {id:'5235',title:'Dear Cole',FKGL:'2.7',RDL2:'13.73',imagen:'assets/imagenes/cole.jpg', href: 'assets/lecturas/cuestionario_5235.htm', archivo: 'cuestionario_5235.htm'},
    {id:'5320',title:'Alex travels',FKGL:'14.75',RDL2:'5.23',imagen:'assets/imagenes/alex.jpg', href: 'assets/lecturas/cuestionario_5320.htm', archivo: 'cuestionario_5320.htm' },
    {id:'5158',title:'Halle Barry',FKGL:'8.98',RDL2:'2.44',imagen:'assets/imagenes/halle.jpg', href: 'assets/lecturas/cuestionario_5158.htm', archivo: 'cuestionario_5158.htm' },
  ]
  constructor(private http: HttpClient) { }



  getAllLecturas(){
    return this.lecturas;
  }

  getLectura(id:string){
    return this.lecturas.find(item=> id === item.id)
  }

  getAvance():Observable<any> {
    return this.http.get(`${this.url}getavance.php?`, {responseType:'text'});
  }

  getHistorial() {
  return this.http.get<any>('http://localhost/tutor-backend/getHistorial.php');
}
}


