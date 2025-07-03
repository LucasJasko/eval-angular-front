import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotifService } from '../../services/notif.service';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-room',
  imports: [RouterLink, DatePipe],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent {
  http = inject(HttpClient);
  rooms: any = [];
  notification = inject(NotifService);
  authService = inject(AuthService);

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.http
      .get('http://localhost:8080/user/list/' + this.authService.user.id)
      .subscribe((room) => {
        this.rooms = room;
        console.log(this.rooms);
      });
  }

  onLeave(room: any) {
    if (confirm('Voulez vous vraiment quitter ce salon ?'))
      this.http
        .post('http://localhost:8080/leave', { room_id: room.room_id })
        .subscribe((res) => {
          this.refresh();
          this.notification.show('Le salon a bien été quitté', 'valid');
        });
  }
}
