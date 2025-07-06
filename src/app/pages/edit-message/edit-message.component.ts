import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifService } from '../../services/notif.service';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-message',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-message.component.html',
  styleUrl: './edit-message.component.scss',
})
export class EditMessageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  http = inject(HttpClient);
  notification = inject(NotifService);
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);

  room_id: any;
  message_id: any;

  formulaire = this.formBuilder.group({
    content: ['', [Validators.maxLength(50), Validators.minLength(1)]],
  });
  ngOnInit() {
    this.room_id = this.route.snapshot.paramMap.get('room_id');
    this.message_id = this.route.snapshot.paramMap.get('message_id');
  }

  onEdit() {
    this.http
      .put('http://localhost:8080/message', {
        message: this.formulaire.value,
        message_id: this.message_id,
      })
      .subscribe((res) => {
        this.notification.show('Message modifié', 'valid');
        this.router.navigateByUrl('/read-messages/' + this.room_id);
      });
  }
}
