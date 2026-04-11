import{Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Lectura } from 'src/app/core/models/lectura.model';

@Component({
  selector: 'app-recomender',
  templateUrl: './recomender.component.html',
  styleUrls: ['./recomender.component.css']
})
export class RecomenderComponent implements OnInit {

  lectura: Lectura[] = []; // Aquí guardaremos todas las lecturas


  

  constructor(private router: Router) { }
  

  ngOnInit(): void {
    // Definimos las 23 lecturas con sus imágenes
    this.lectura = [
      { id: '5197', title: "Hannah's story", FKGL: '3.21', RDL2: '34.19', imagen: 'assets/imagenes/HANNAH.jpg', href: 'assets/lecturas/cuestionario_5197.htm', archivo: 'cuestionario_5197.htm'},
      { id: '5119', title: "My ROUTINE", FKGL: '3.50', RDL2: '36.00', imagen: 'assets/imagenes/My_Rutine.jpg' , href: 'assets/lecturas/cuestionario_5119.htm', archivo: 'cuestionario_5119.htm'},
      { id: '5429', title: "DEAR MR.JACKSON", FKGL: '4.12', RDL2: '35.10', imagen: 'assets/imagenes/jackson.jpg' , href: 'assets/lecturas/cuestionario_5429.htm', archivo: 'cuestionario_5429.htm'},
      { id: '4417', title: "WHAT DO YOU DO WITH YOUR FREE", FKGL: '35.10', RDL2: '33.50', imagen: 'assets/imagenes/free time.jpg' , href: 'assets/lecturas/cuestionario_4417.htm', archivo: 'cuestionario_4417.htm' },
      { id: '5013', title: "MALCOMS TRIP", FKGL: '3.95', RDL2: '34.80', imagen: 'assets/imagenes/trips.jpg' , href: 'assets/lecturas/cuestionario_5013.htm', archivo: 'cuestionario_5013.htm' },
      { id: '5225', title: "FRAK'S STORY 6", FKGL: '4.20', RDL2: '36.40', imagen: 'assets/imagenes/frak.jpg' , href: 'assets/lecturas/cuestionario_5225.htm', archivo: 'cuestionario_5225.htm' },
      { id: '5511', title: "MARK", FKGL: '3.60', RDL2: '35.00', imagen: 'assets/imagenes/mark.jpg' , href: 'assets/lecturas/cuestionario_5511.htm', archivo: 'cuestionario_5511.htm'},
      { id: '4497', title: "SAMANTHA DAILY", FKGL: '3.70', RDL2: '34.90', imagen: 'assets/imagenes/SAM.jpg' , href: 'assets/lecturas/cuestionario_4497.htm', archivo: 'cuestionario_4497.htm'},
      { id: '5392', title: "NOELLE FROM IRELAND", FKGL: '3.85', RDL2: '35.50', imagen: 'assets/imagenes/NOELLE.jpg', href: 'assets/lecturas/cuestionario_5392.htm',archivo: 'cuestionario_5392.htm'},
      { id: '4969', title: "LENAS EMAIL", FKGL: '4.00', RDL2: '36.00', imagen: 'assets/imagenes/email.jpg' , href: 'assets/lecturas/cuestionario_4969.htm', archivo: 'cuestionario_4969.htm' }, 
      { id: '6631', title: "BEST BODY FITNESS", FKGL: '3.50', RDL2: '34.00', imagen: 'assets/imagenes/FITNESS.jpg' , href: 'assets/lecturas/cuestionario_6631.htm', archivo: 'cuestionario_6631.htm' },
      { id: '5417', title: "TIRED BORED", FKGL: '3.80', RDL2: '35.50', imagen: 'assets/imagenes/tired.jpg' , href: 'assets/lecturas/cuestionario_5417.htm', archivo: 'cuestionario_5417.htm' },
      { id: '6627', title: "PROFESSIONAL PROFILE SUMMARIES", FKGL: '4.10', RDL2: '36.20', imagen: 'assets/imagenes/profesional.jpg' , href: 'assets/lecturas/cuestionario_6627.htm', archivo: 'cuestionario_6627.htm'},
      { id: '6631', title: "STUDY SKILL TIPS", FKGL: '3.90', RDL2: '35.80', imagen: 'assets/imagenes/Study.jpg' , href: 'assets/lecturas/cuestionario_6632.htm', archivo: 'cuestionario_6632.htm' },
      { id: '5574', title: "SOCIAL MEDIA INFLUENCERS", FKGL: '4.05', RDL2: '36.10', imagen: 'assets/imagenes/socialmedia.jpg' , href: 'assets/lecturas/cuestionario_5574.htm', archivo: 'cuestionario_5574.htm' },
      { id: '5139', title: "MARIA KOCHETKOVA", FKGL: '3.75', RDL2: '34.90', imagen: 'assets/imagenes/Mariako.jpg' , href: 'assets/lecturas/cuestionario_5139.htm', archivo: 'cuestionario_5139.htm' },
      { id: '5004', title: "MY NEIGHBORHOOD", FKGL: '3.60', RDL2: '34.50', imagen: 'assets/imagenes/vecinos.jpg' , href: 'assets/lecturas/cuestionario_5004.htm', archivo: 'cuestionario_5004.htm'},
      { id: '5108', title: "MEALS IN BRITIAN", FKGL: '3.95', RDL2: '35.90', imagen: 'assets/imagenes/MEALS.JPG' , href: 'assets/lecturas/cuestionario_5108.htm', archivo: 'cuestionario_5108.htm' },
      { id: '5000', title: "WORLD MARKEERS", FKGL: '4.00', RDL2: '36.00', imagen: 'assets/imagenes/MARKEERS.jpg' , href: 'assets/lecturas/cuestionario_5000.htm', archivo: 'cuestionario_5000.htm' },
      { id: '4410', title: "JENNIFER LOPEZ", FKGL: '3.80', RDL2: '35.60', imagen: 'assets/imagenes/jenniferlopez.jpg' , href: 'assets/lecturas/cuestionario_4410.htm', archivo: 'cuestionario_4410.htm'},
      { id: '5235', title: "DEAR COLE", FKGL: '3.90', RDL2: '36.10', imagen: 'assets/imagenes/cole.jpg' , href: 'assets/lecturas/cuestionario_5235.htm', archivo: 'cuestionario_5235.htm'},
      { id: '5320', title: "ALEX TRAVELS", FKGL: '3.85', RDL2: '35.50', imagen: 'assets/imagenes/alex.jpg' , href: 'assets/lecturas/cuestionario_5320.htm', archivo: 'cuestionario_5320.htm' },
      { id: '5158', title: "HALLE BARRY", FKGL: '4.00', RDL2: '36.20', imagen: 'assets/imagenes/halle.jpg' , href: 'assets/lecturas/cuestionario_5158.htm', archivo: 'cuestionario_5158.htm' }
    ];
  }
  
clickLectura(lectura: Lectura): void {
  console.log('lectura seleccionada:', lectura);

  this.router.navigate(['/lectura', lectura.id], {
    state: { nombre: lectura.title }
  });
}
  //clickLectura(id: string): void {
   // console.log('lectura seleccionada:', id);

   // this.router.navigate(['/lectura', id]);
    // Aquí puedes agregar redirección si quieres
    // Ejemplo:
    // this.router.navigate([`/lectura/${id}`]);
    
  }
  
//}
