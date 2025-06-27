import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotifService } from '../../services/notif.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authService = inject(AuthService);
  notif = inject(NotifService);

  onLogOut() {
    this.authService.deconnexion();
    this.notif.show('Vous êtes bien déconnecté', 'valid');
  }
}
