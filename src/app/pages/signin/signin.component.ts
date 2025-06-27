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

@Component({
  selector: 'app-signin',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  formBuilder = inject(FormBuilder);
  notification = inject(NotifService);
  router = inject(Router);
  http = inject(HttpClient);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
  });

  onInscription() {
    if (this.formulaire.valid) {
      this.http
        .post('http://localhost:5000/signin', this.formulaire.value)
        .subscribe({
          next: (res) => {
            this.notification.show(
              'Vous etes inscrit, vous pouvez vous connecter !',
              'valid'
            );
            this.router.navigateByUrl('/connection');
          },
          error: (err) => {
            if (err.status === 409) {
              this.notification.show('Cet email est déjà utilisé', 'error');
            }
          },
        });
    }
  }
}
