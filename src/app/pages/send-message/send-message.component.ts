import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NotifService } from '../../services/notif.service';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-send-message',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss',
})
export class SendMessageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  http = inject(HttpClient);
  notification = inject(NotifService);
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);

  id: any;

  formulaire = this.formBuilder.group({
    content: ['', [Validators.maxLength(50)]],
  });
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  onSend() {
    this.http
      .post('http://localhost:8080/message', {
        room_id: this.id,
        message: this.formulaire.value,
      })
      .subscribe((res) => {
        this.notification.show('Message envoyé', 'valid');
        this.router.navigateByUrl('/read-messages/' + this.id);
      });
  }
}
