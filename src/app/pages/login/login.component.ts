import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotifService } from '../../services/notif.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  notification = inject(NotifService);
  router = inject(Router);
  http = inject(HttpClient);
  authService = inject(AuthService);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
  });

  onConnection() {
    this.http
      .post('http://localhost:5000/login', this.formulaire.value, {
        responseType: 'text',
      })
      .subscribe((jwt) => {
        this.authService.decodeJwt(jwt);
        this.notification.show('Vous êtes connecté', 'valid');
        this.router.navigateByUrl('/home');
      });
  }
}
