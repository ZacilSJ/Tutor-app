import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../core/service/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formularioRegistro!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userservice: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioRegistro = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      user: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  guardarregistro() {
    this.userservice.guardarregistro(this.formularioRegistro.value).subscribe(
      (datos: any) => {

        console.log("RESPUESTA DEL BACKEND:", datos);

        alert(datos['mensaje'] || 'Registro exitoso');

        // Redirecciona SIEMPRE 
        this.router.navigate(['/login']);
      },
      error => console.log(error)
    );
  }
}
