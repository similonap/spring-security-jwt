import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUserDto, TokenDto, UserResponseDto } from '../types';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  private user: UserResponseDto | null = null;
  
  get isLoggedIn() {
    return this.user !== null;
  }

  get username() {
    return this.user?.username;
  }

  get role() {
    return this.user?.role;
  }

  async getUser() {
    this.user = await lastValueFrom(this.http.get<UserResponseDto>("/api/auth/user", {
      withCredentials: true
    }));
    return this.user;
  }

  async logout() {
    this.user = null;
    this.router.navigate(["/login"]);
    await lastValueFrom(this.http.post("/api/auth/logout", {}, {
      withCredentials: true
    }));
  }

  async login(username: string, password: string) {
    let loginResponse = await lastValueFrom(this.http.post<TokenDto>(`/api/auth/login`, { username, password }, {
      withCredentials: false
    }));

    await this.getUser();
    this.router.navigate(["/"]);
    
    return loginResponse;
  }
}
