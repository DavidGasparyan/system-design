import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from "./storage.service";

const AUTH_API = '/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        email,
        password,
      },
      // httpOptions
    );
  }

  logout() {
    this.storageService.clean();
    return this.http.delete(AUTH_API + 'log_out');
  }

  register(data: any): Observable<any> {
    const {
      username,
      email,
      password,
      confirmPassword,
      phoneNumber
    } = data;

    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        email,
        password,
        confirmPassword,
        phoneNumber,
      },
      // httpOptions
    );
  }
}
