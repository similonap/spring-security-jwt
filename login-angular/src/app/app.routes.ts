import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // No guard here, to allow access to unauthenticated users
    { path: '', component: HomeComponent, canActivate: [authGuard] }, // Guard applied to home route
    { path: '**', redirectTo: '' } // Redirect to home route if no route is found
];
