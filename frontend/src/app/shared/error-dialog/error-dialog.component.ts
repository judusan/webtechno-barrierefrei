import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
})
export class ErrorDialogComponent {
  private originalTitle: string;

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private titleService: Title
  ) {
    this.originalTitle = this.titleService.getTitle();
    this.titleService.setTitle('Error');
  }

  onClose(): void {
    this.dialogRef.close();
    this.titleService.setTitle(this.originalTitle);
  }
}
