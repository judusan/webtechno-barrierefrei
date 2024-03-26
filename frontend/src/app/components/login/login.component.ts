import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { BackendService } from '../../shared/backend.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private bs: BackendService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi-eye" : this.eyeIcon = "bi-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){

      console.log(this.loginForm.value)
      const values = this.loginForm.value;
      const username = values.username;
      const password =  values.password;
  
      this.bs.loginUser(username, password).subscribe(
          response => {
            console.log('response',response);
            this.auth.login(response);
            this.loginForm.reset();
            this.router.navigate(['table'])
          },
          error => {
            console.log('error', error);
            console.log('error status', error.status);
            console.log('error error message', error.error.error);
            this.auth.logout();
          })
    } else {
      this.validateAllFormFields(this.loginForm);
      alert("Invalid form");
    }
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
