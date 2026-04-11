import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // 🏠 Home
  irAHome() {
    this.router.navigate(['/home']);
  }

  // 👤 Usuarios / perfil (ajústalo si tienes otra ruta)
  irAUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  // 📝 Cuestionarios
  irACuestionarios() {
    this.router.navigate(['/cuestionario']);
  }

  // 📊 Statistics (TU CASO IMPORTANTE)
  irAStatistics() {
    this.router.navigate(['/statistics']);
  }

  // 🚪 Logout
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}