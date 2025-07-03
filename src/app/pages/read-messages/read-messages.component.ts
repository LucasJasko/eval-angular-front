import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NotifService } from '../../services/notif.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-messages',
  imports: [],
  templateUrl: './read-messages.component.html',
  styleUrl: './read-messages.component.scss',
})
export class ReadMessagesComponent {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  id: any;
  messages: any = [];
  notification = inject(NotifService);
  authService = inject(AuthService);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.read();
  }

  read() {
    this.http
      .get('http://localhost:8080/messages/' + this.id)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }
}
