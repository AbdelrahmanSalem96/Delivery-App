import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { error, log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject<any>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private angularFireMessaging:AngularFireMessaging) { }

  requetPermission(){
    this.angularFireMessaging.requestToken.subscribe(
      (token: string | null) => {
      if (token) {
        this.tokenSubject.next(token);
      } else {
        console.log("Token is null");
        this.tokenSubject.next(null);
      }
    }, (err) => {
      console.log("unable to get permission to notify", err);
      this.tokenSubject.next(null);
    })
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  receiveMessaging(){
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log("new message", payload);
      this.currentMessage.next(payload);
    })
  }
}
