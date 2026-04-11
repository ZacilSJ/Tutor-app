import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: string = '';
  password: string = '';
  usuario: string = '';

  // Haz público el servicio si quieres llamarlo desde el template directamente
  constructor(public userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    sessionStorage.clear();
  }

  login() {
    if (!this.user || !this.password) {
      alert('Ingresa usuario/email y contraseña');
      return;
    }

    this.userService.buscausuario(this.user, this.password).subscribe({
      next: (texto: string) => {
        // Si el backend respondió el usuario (texto simple), lo guardamos
        if (texto && !texto.startsWith('ATENCION') && !texto.toLowerCase().includes('inválidas')) {
          this.usuario = texto;
          this.userService.setToken(texto);
          console.log("almacenado:", sessionStorage.getItem('ident'));

          // Redirige a donde corresponda
          // this.router.navigate(['/home']);
        } else {
          alert(texto || 'Credenciales inválidas');
        }
      },
      error: (err) => {
        console.error(err);
        alert('No se pudo iniciar sesión');
      }
    });
  }

  // Opción A: método para el *ngIf del template
  estaAutenticado(): boolean {
    return this.userService.estaAutenticado();
  }

  // Opción B alternativa: si prefieres usar un getter en el template sin paréntesis
  // get autenticado(): boolean {
  //   return this.userService.estaAutenticado();
  // }
}
