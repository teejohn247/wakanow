import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

// import ParticlesConfig from '../particles.json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;

  // particlesConfig = ParticlesConfig;

  registerForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [ Validators.required]),
  })

  constructor(
    private auth: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {

    this.submitted = true;
    if(this.registerForm.valid) {
        this.auth.register(this.registerForm.value).subscribe({
          next: (res: { status: number; data: { firstName: string; lastName: string; email: string; password: string }; }) => {
            if(res.status == 200) {
              if(res.data) {
                this.route.navigate(['/login'])
              }
              else {
                // this.route.navigate(['/login']);
              }
            }
          },
          error: (err: { error: { msg: any; }; }) => {
            alert(err.error?.msg)
            // this.notify.showError(err.error.error);
          }
        })
    }
}
}
