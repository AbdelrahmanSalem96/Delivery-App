import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Configs } from '../../Core/Utility/Config';

export interface LoginModel{
  email:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = Configs.apiUrl+'/v1/Authentication';

  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private userKey = 'userId';
  // private userId!: string;
  // private userRole!: string;

  constructor(private http: HttpClient) {}

  login(loginData:LoginModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, loginData).pipe(
      tap((response: any) => {
        this.storeToken(response.token);
        this.storeRole(response.data.role);
        this.storeUserId(response.data.id);
        // this.setUserRole(response.data.role);
        // this.setUserId(response.data.id);
      })
    );
  }

  // setUserId(id: string): void {
  //   this.userId = id;
  // }

  // getUserId(): string {
  //   return this.userId;
  // }

  // setUserRole(role: string): void {
  //   this.userRole = role;
  // }

  // getUserRole(): string {
  //   return this.userRole;
  // }

  storeToken(token: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      console.warn('LocalStorage is not available');
    }
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  storeRole(role: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.roleKey, role);
    } else {
      console.warn('LocalStorage is not available');
    }
  }

  getRole(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.roleKey);
    }
    return null;
  }

  storeUserId(id: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.userKey, id);
    } else {
      console.warn('LocalStorage is not available');
    }
  }

  getUserId(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.userKey);
    }
    return null;
  }

  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.roleKey);
      localStorage.removeItem(this.userKey);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'localStorageTest';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
