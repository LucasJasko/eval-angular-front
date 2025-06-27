import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoomComponent } from './pages/room/room.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { P404Component } from './pages/p404/p404.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'room', component: RoomComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-room', component: CreateRoomComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: P404Component },
];
