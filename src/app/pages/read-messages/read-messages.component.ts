import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NotifService } from '../../services/notif.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-read-messages',
  imports: [RouterLink],
  templateUrl: './read-messages.component.html',
  styleUrl: './read-messages.component.scss',
})
export class ReadMessagesComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
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

  onDelete(id: string) {
    this.http
      .delete('http://localhost:8080/message', {
        body: { message_id: id },
      })
      .subscribe((res) => {
        this.router.navigateByUrl('/read-messages/' + this.id);
      });
    window.location.reload();
  }
}
