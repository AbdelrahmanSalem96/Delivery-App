import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginModel } from '../../../Service/Test Service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  logindata!:LoginModel;
  userData!:any;

  constructor(private authService: AuthService, private router: Router, private snackBar:MatSnackBar) {}

  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe(
      (response: any) => {
        this.userData = response.data;
        this.authService.storeToken(response.token);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Login failed', error);
        this.snackBar.open('Login Failed', 'Close', { duration: 2000 });
      }
    );
  }

}
