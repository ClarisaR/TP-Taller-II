import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'login';
  error: string;
  loginForm: FormGroup;
  constructor(protected loginService: AuthService, protected formBuilder: FormBuilder, protected router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.loginService._user.subscribe(user => {

      if(user){
        this.router.navigate(['/tasks']);
      }
    });
  }

  onSubmit(){
    console.log('Formulario enviado');
    if (this.loginForm.invalid) {
      this.error = 'Por favor, completa todos los campos.';
      return;
    }

    const { username, password } = this.loginForm.value;


    this.loginService.login(username, password).subscribe({
      error: (err) => {
        console.log(err);
        this.error = err.message || 'Credenciales inválidas.';
      },
    });
  }

  redirectRegister() {
    this.router.navigate(['/register']);
  }
}
