import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginModel } from '../../../Service/Test Service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo } from 'rxjs';
import { MessagingService } from '../../../Service/Test Service/messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginData: LoginModel = {
    email: '',
    password: '',
    DeviceId: ''
  };
  userData!:any;
  message:any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private afMessaging: AngularFireMessaging ,
    private messagingService:MessagingService,
    private authService: AuthService,
    private router: Router,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.messagingService.requetPermission();
  }

  // ngOnInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.requestPermission();
  //     this.listenForMessages();
  //     navigator.serviceWorker.register('firebase-messaging-sw.js')
  //       .then((registration) => {
  //         console.log('Service Worker registered with scope:', registration.scope);
  //       }).catch((err) => {
  //         console.error('Service Worker registration failed:', err);
  //       });
  //   }
  // }

  // requestPermission() {
  //   this.afMessaging.requestPermission
  //     .pipe(
  //       mergeMapTo(this.afMessaging.tokenChanges)
  //     )
  //     .subscribe(
  //       (token:any) => {
  //         console.log('Permission granted! Save to the server!', token);
  //         this.loginData.DeviceId = token;
  //       },
  //       (error) => { console.error(error); },
  //     );
  // }

  // listenForMessages() {
  //   this.afMessaging.messages
  //     .subscribe((message) => {
  //       console.log('New message received: ', message);
  //     });
  // }

  onSubmit(form: NgForm) {
    const token = this.messagingService.getToken();
    if(token){
      this.loginData.DeviceId = token;
    }
    this.loginData.email = form.value.email;
    this.loginData.password = form.value.password;
    this.authService.login(this.loginData).subscribe(
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
