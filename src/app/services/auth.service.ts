import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;

  constructor() {
    const jwt = localStorage.getItem('accessToken');
    if (jwt != null) this.decodeJwt(jwt);
  }

  decodeJwt(jwt: string) {
    localStorage.setItem('token', jwt);
    const jwtParts = jwt.split('.');
    this.user = JSON.parse(atob(jwtParts[1]));

    console.log(this.user);
  }

  deconnexion() {
    localStorage.removeItem('token');
    this.user = null;
  }
}
