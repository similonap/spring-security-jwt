import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoginUserDto } from '../types';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public model: LoginUserDto = {

  }

  constructor(private authService: AuthenticationService) { }

  async onSubmit() {
    console.log(this.model);
    let response = await this.authService.login(this.model.username!, this.model.password!);
  }
}
