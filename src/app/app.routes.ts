import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoomComponent } from './pages/room/room.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { P404Component } from './pages/p404/p404.component';
import { EditRoomComponent } from './pages/edit-room/edit-room.component';
import { modoGuard } from './services/modo.guard';
import { SigninComponent } from './pages/signin/signin.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'room', component: RoomComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'create-room',
    component: CreateRoomComponent,
    canActivate: [modoGuard],
  },
  {
    path: 'edit-room/:id',
    component: EditRoomComponent,
    canActivate: [modoGuard],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: P404Component },
];
