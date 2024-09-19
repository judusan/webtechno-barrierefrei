import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../shared/backend.service';
import { Router } from '@angular/router';
import { DialogService } from '../../shared/dialog.service';

export interface DialogData {
  headline: string;
  info: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css',
     '../styles/auth-styles.css'
  ]
})

export class RegisterComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi-eye-slash"
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private bs : BackendService, private router: Router, private dialogService: DialogService) { }

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
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username')?.value;
      
      this.bs.checkIfUsernameExist(username).subscribe(
      response => {
        if (response) {
          this.dialogService.openErrorDialog("Username already exists. Please choose a different one.");
        }
        else
        {
          this.bs.registerNewUser(this.registerForm.value).subscribe(
          response => {
            console.log('response', response);
            this.registerForm.reset();
            this.dialogService.openInfoDialog("User " + response.username + " registered successfully!");
            this.router.navigate(['login']);
          },
          error => {
            console.log('error', error);
            this.dialogService.openErrorDialog("Username already exists. Please choose a different one.");
            console.log('error status', error.status);
            console.log('error error message', error.error.error);
          });
        }
      },
      error => {
        console.log(error);
      });
    } 
    else {
      console.log('Form is invalid');
      this.dialogService.openErrorDialog("Some required fields are missing. Please ensure all fields are completed.");
      this.validateAllFormFields(this.registerForm);
    }
  }

  checkIfUsernameExists(evt: any): void {
    let username = this.registerForm.get('username')?.value;
    console.log('event-target', evt);
    console.log(username);
    this.bs.checkIfUsernameExist(username).subscribe(
      response => {
        console.log(response);
        if(response) {
          this.dialogService.openErrorDialog("Username already exists. Please choose a different one.");
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