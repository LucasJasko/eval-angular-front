import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoomComponent } from './pages/room/room.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { P404Component } from './pages/p404/p404.component';
import { EditRoomComponent } from './pages/edit-room/edit-room.component';
import { modoGuard } from './services/modo.guard';
import { SigninComponent } from './pages/signin/signin.component';
import { SendMessageComponent } from './pages/send-message/send-message.component';
import { ReadMessagesComponent } from './pages/read-messages/read-messages.component';
import { EditMessageComponent } from './pages/edit-message/edit-message.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'send-message/:id', component: SendMessageComponent },
  { path: 'read-messages/:id', component: ReadMessagesComponent },
  {
    path: 'edit-message/:room_id/:message_id',
    component: EditMessageComponent,
  },

  { path: 'room', component: RoomComponent },
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
