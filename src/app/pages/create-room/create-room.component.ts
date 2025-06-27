import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotifService } from '../../services/notif.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-room',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss',
})
export class CreateRoomComponent {
  formBuilder = inject(FormBuilder);
  notification = inject(NotifService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  http = inject(HttpClient);

  formulaire = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(50)]],
  });

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      if (parameters['id']) {
        this.http
          .get('http://localhost:8080/room/' + parameters['id'])
          .subscribe((produit) => {
            this.formulaire.patchValue(produit);
          });
      }
    });
  }

  onAddRoom() {
    if (this.formulaire.valid) {
      this.http
        .post('http://localhost:8080/room', this.formulaire.value)
        .subscribe({
          next: (res) => {
            this.notification.show('Le salon a bien été ajouté ! ', 'valid');
            this.router.navigateByUrl('/home');
          },
          error: (err) => {
            if (err.status === 409) {
              this.notification.show('Un salon porte déjà ce nom', 'error');
            }
          },
        });
    }
  }
}
