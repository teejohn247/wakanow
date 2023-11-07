import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [ Validators.required]),
  })

  constructor(
    private auth: AuthService,
    private route: Router
  ) {}

  ngOnInit() {
    // this.loginForm = this.fb.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }

  // isFieldInvalid(field: string) {
  //   return (
  //     this.form &&
  //     ((!this.form?.get(field).valid && this.form.get(field).touched) ||
  //     (this.form.get(field).untouched && this.formSubmitAttempt))
  //   );
  // }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     this.authService.login(this.loginForm.value);
  //   }
  //   this.formSubmitAttempt = true;
  // }

  showPassword: boolean = false;
  submitted: boolean = false;
  existingUser: boolean = true;
  loggingIn: boolean = false;
  forgotPass: boolean = false;
  setPass: boolean = false;
  userToken: string | undefined;
  authDetails: any;

  onSubmit() {

    this.submitted = true;

    console.log('here', this.loginForm.valid)
    if(this.loginForm.valid) {
      if(this.existingUser) {
        this.auth.login(this.loginForm.value).subscribe({
          next: (res: { status: number; data: { email: any; token: any; }; }) => {
            console.log(res);
            if(res.status == 200) {
              if(res.data) {
                this.route.navigate(['/'])
              }
              else {
                this.route.navigate(['/login']);
              }
            }
          },
          error: (err: { error: { error: any; }; }) => {
            console.log(err)
            // this.notify.showError(err.error.error);
          }
        })
      }
    }
}
}
