import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuestionario-viewer',
  templateUrl: './cuestionario-viewer.component.html',
  styleUrls: ['./cuestionario-viewer.component.scss']
})
export class CuestionarioViewerComponent implements OnInit, AfterViewInit {

  @ViewChild('miIframe') iframeRef!: ElementRef<HTMLIFrameElement>;

  cuestionarioUrl: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.cuestionarioUrl = `assets/lecturas/cuestionario_${id}.htm`;
    }
  }

  ngAfterViewInit(): void {
    const iframe = this.iframeRef.nativeElement;

    const ajustarAltura = () => {
      try {

        
         const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    const altura = doc.documentElement.getBoundingClientRect().height;

    iframe.style.height = (altura + 5) + 'px';

      } catch (e) {
        console.error('Error ajustando altura del iframe', e);
      }
    };

    iframe.onload = () => {
      
      ajustarAltura();
      setTimeout(ajustarAltura, 200);
      setTimeout(ajustarAltura, 500);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;

      if (doc) {
       
        const observer = new MutationObserver(ajustarAltura);
        observer.observe(doc.body, {
          childList: true,
          subtree: true,
          attributes: true
        });

    
     
      }
    };
  }
}

//import { Component, OnInit } from '@angular/core';

//@Component({
  //selector: 'app-cuestionario-viewer',
  //templateUrl: './cuestionario-viewer.component.html',
  //styleUrls: ['./cuestionario-viewer.component.css']
//})
//export class CuestionarioViewerComponent implements OnInit {

  //constructor() { }

  //ngOnInit(): void {
    //const is = this.route.sanpshot.pamMap.get('id');
    //if (id) {
      //this.cuestionarioUrl = 'assets/lecturas/cuestionario_${id}.htm':
    //}

  //}

//}
