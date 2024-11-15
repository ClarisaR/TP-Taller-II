import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'login'
  error: string
  loginForm: FormGroup
  constructor(protected loginService: AuthService, protected formBuilder: FormBuilder, protected router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    // Manejar el estado del usuario desde el observable
    this.loginService._user.subscribe(user => {

      if(user){
        this.router.navigate(['/tasks'])
      }
    });
  }

  onSubmit(){
    console.log('Formulario enviado')
    if (this.loginForm.invalid) {
      this.error = 'Por favor, completa todos los campos.';
      return;
    }

    const { username, password } = this.loginForm.value;

    // Invocar el servicio para iniciar sesión
    this.loginService.login(username, password).subscribe({
      error: (err) => {
        console.log(err)
        this.error = err.message || 'Credenciales inválidas.';
      },
    });
  }
}
