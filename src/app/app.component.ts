import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './theme.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
@Component({
  selector:'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkTheme: Observable<boolean>;

  constructor(private themeService: ThemeService, private apiService: ApiService, private route: Router) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    if(this.apiService.userLoggedIn == null) {
      this.route.navigateByUrl('login');
    }
  }
}
