import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../shared/backend.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExistDialogComponent } from './exist-dialog/exist-dialog.component';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi-eye-slash"
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private bs : BackendService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      forename: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]

    })
    
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi-eye" : this.eyeIcon = "bi-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onRegister() {
    if(this.registerForm.valid) {
      this.bs.registerNewUser(this.registerForm.value).subscribe(
      response => {
        console.log('response',response);
        this.registerForm.reset();
        this.router.navigate(['login']);
      },
      error => {
        console.log('error', error);
        console.log('error status', error.status);
        console.log('error error message', error.error.error);
      })
      console.log(this.registerForm.value)
    } else {
      this.validateAllFormFields(this.registerForm)
    }
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ExistDialogComponent, dialogConfig);
}

  checkIfUsernameExists(evt: any): void {
    let username = this.registerForm.get('username')?.value;
    console.log('event-target', evt);
    console.log(username);
    this.bs.checkIfUsernameExist(username).subscribe(
      response => {
        console.log(response);
        if(response) {
          this.openDialog();
      }
    },
      error => {
        console.log(error);
      }
    );
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field=> {
      const control = formGroup.get(field)

      if(control instanceof FormControl) {
        control.markAsDirty({onlySelf:true});
      } else if(control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }

    })
  }

}
