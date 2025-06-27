import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NotifService } from '../../services/notif.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  http = inject(HttpClient);
  rooms: any = [];
  notification = inject(NotifService);
  authService = inject(AuthService);

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.http.get('http://localhost:8080/room/list').subscribe((room) => {
      this.rooms = room;
      console.log(this.rooms);
    });
  }

  onDelete(room: any) {
    if (confirm('Voulez vous vraiment supprimer ce salon ?'))
      this.http
        .delete('http://localhost:8080/room/' + room.room_id)
        .subscribe((res) => {
          this.refresh();
          this.notification.show('Le salon a bien été supprimé', 'valid');
        });
  }
}
