import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InfoDialogComponent } from '../shared/info-dialog/info-dialog.component';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { headline: title, info: message }
    });
    return dialogRef.afterClosed();
  }

  openInfoDialog(message: string) {
    this.dialog.open(InfoDialogComponent, {
      data: { message: message }
    });
  }

  openErrorDialog(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: message }
    });
  }
}