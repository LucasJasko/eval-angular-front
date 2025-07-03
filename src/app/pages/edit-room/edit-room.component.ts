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
  selector: 'app-edit-room',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.scss',
})
export class EditRoomComponent {
  formBuilder = inject(FormBuilder);
  notification = inject(NotifService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  http = inject(HttpClient);

  formulaire = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(50)]],
  });

  salonEditer: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      if (parameters['id']) {
        this.http
          .get('http://localhost:8080/room/' + parameters['id'])
          .subscribe((salon) => {
            this.formulaire.patchValue(salon);
            this.salonEditer = salon;
          });
      }
    });
  }

  onEditRoom() {
    if (this.formulaire.valid) {
      this.http
        .put(
          'http://localhost:8080/room/' + this.salonEditer.room_id,
          this.formulaire.value
        )
        .subscribe({
          next: (res) => {
            this.notification.show('Le salon a bien été modifié ! ', 'valid');
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
