import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Router, ChildActivationEnd } from '@angular/router';
import { User } from './user';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  message: boolean;

  constructor(private apiService: ApiService, private route: Router) {
      if(this.apiService.userLoggedIn == null) {
        this.route.navigateByUrl('login');
      }
      this.apiService.currentMessage.subscribe(message => this.message = message)
  }

  homepage(): void {
    if(this.apiService.userLoggedIn) {
      this.route.navigateByUrl('dashboard')
    }
  }

  profilepage(): void {
    this.route.navigateByUrl('/profile/' + this.apiService.userLoggedIn.id)
  }

  logout(): void {
    this.apiService.userLoggedIn = null;
    this.message = false;
    this.route.navigateByUrl('login');
  }
}
