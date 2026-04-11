import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {LecturasService} from '../../core/service/lecturas.service';
import { Lectura } from '../../core/models/lectura.model';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lectura-detail',
  templateUrl: './lectura-detail.component.html',
  styleUrls: ['./lectura-detail.component.css']
})
export class LecturaDetailComponent implements OnInit {


 // OnInit{
    lectura: Lectura;
    //apiBaseURL=Config.API_SERVER_URL;
    public safeSrc: SafeResourceUrl;
    constructor(
      private route: ActivatedRoute, // lo agregué
      private LecturasService: LecturasService, //agregado
      private sanitizer: DomSanitizer) { } //agregado recién

      ngOnInit() {//  ngOnInit(): void {
       this.route.params.subscribe((params: Params) => {
       const id = params.id;
       this.lectura = this.LecturasService.getLectura(id);
       console.log('ID:', id);
       console.log('LECTURA, this.lectura');
      //this.sanitizer.bypassSecurityTrustResourceUrl(this.lectura.href);//quizás mal direccionado
      //this.sanitizer.bypassSecurityTrustUrl(this.lectura.href);//quizás mal direccionado
      //console.log(this.lectura.href);
       this.safeSrc=this.sanitizer.bypassSecurityTrustUrl(this.lectura.href);
    });
  //}
  }
}
