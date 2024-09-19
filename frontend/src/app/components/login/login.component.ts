import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../shared/backend.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { DialogService } from '../../shared/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
          '../styles/auth-styles.css'
  ]
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi-eye-slash";
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bs: BackendService,
    private router: Router,
    private auth: AuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "bi-eye" : "bi-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onLogin() {
    if (this.loginForm.valid) {
      const values = this.loginForm.value;
      const username = values.username;
      const password = values.password;

      this.bs.loginUser(username, password).subscribe(
        response => {
          this.auth.login(response);
          this.loginForm.reset();
          this.dialogService.openInfoDialog('Username and password correct, welcome back!');
          this.router.navigate(['table']);
        },
        error => {
          this.auth.logout();
          this.dialogService.openErrorDialog('Username or password is incorrect. Please try again!');
        }
      );
    } 
    else {
      this.validateAllFormFields(this.loginForm);
      this.dialogService.openErrorDialog("Some required fields are missing. Please ensure all fields are completed.");
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}