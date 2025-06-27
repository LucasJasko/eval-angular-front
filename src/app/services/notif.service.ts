import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotifService {
  // notif = inject(MatSnackBar);
  show(message: string, type: 'info' | 'valid' | 'error' | 'warning') {
    // this.notif.open(message, '', {
    //   verticalPosition: 'bottom',
    //   duration: 5000,
    //   panelClass: type,
    // });
  }
}
