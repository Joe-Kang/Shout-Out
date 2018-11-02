import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {

  constructor(private apiService: ApiService,
    private route: Router) {
    }

  homepage(): void {
    if(this.apiService.userLoggedIn) {
      this.route.navigateByUrl('dashboard')
      console.log("go to homepage")
    }
  }
  profilepage(): void {
    if(this.apiService.userLoggedIn) {
      this.route.navigateByUrl('/profile/' + this.apiService.userLoggedIn.id)
    }
  }
}
