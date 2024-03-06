import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public constructor(private authService: AuthenticationService) {

  }

  public async logout() { 
    await this.authService.logout();
  
  }

  public get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  public get username() {
    return this.authService.username;
  }

  public get role() {
    return this.authService.role;
  }

}
