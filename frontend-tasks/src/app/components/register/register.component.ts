import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error: string | null = null;

  constructor(protected authService: AuthService, protected formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;

      // Llamamos al servicio para registrar al usuario
      this.authService.register(username, password).subscribe({
        next: (response) => {
          // Si el registro es exitoso, puedes redirigir o mostrar un mensaje
          console.log('Registro exitoso:', response.message);
          this.router.navigate(['/login']);  // Redirige al login, por ejemplo
        },
        error: (error) => {
          this.error = error.message || 'Error al registrar usuario';
        }
      });
    }
  }

  redirectLogin(){
      this.router.navigate(['/login']);
    }
  
}
