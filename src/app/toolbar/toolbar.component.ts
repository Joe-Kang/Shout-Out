import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import { Observable } from 'rxjs';
import {OverlayContainer} from "@angular/cdk/overlay";
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  status: boolean;
  overlay;

  constructor(private apiService: ApiService, private route: Router, private themeService: ThemeService, private overlayContainer: OverlayContainer) {
    this.overlay = overlayContainer.getContainerElement();
    this.overlay.classList.add("custom-theme");
    this.apiService.currentStatus.subscribe(status => this.status = status)
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    console.log("toggle")
    this.themeService.setDarkTheme(checked);
    if (this.overlay.classList.contains("dark-theme")) {
      this.overlay.classList.remove("dark-theme");
      this.overlay.classList.add("custom-theme");
    } else if (this.overlay.classList.contains("custom-theme")) {
        this.overlay.classList.remove("custom-theme");
        this.overlay.classList.add("dark-theme");
    } else {
        this.overlay.classList.add("custom-theme");
    }
  }

  homepage(): void {
    if(this.apiService.userLoggedIn) {
      this.route.navigateByUrl('dashboard')
    }
  }

  profilepage(): void {
    this.route.navigateByUrl('/profile/' + this.apiService.userLoggedIn.id)
  }

  rate(): void {
    this.route.navigateByUrl('/rate/' + this.apiService.numOfRatings);
  }

  logout(): void {
    this.apiService.userLoggedIn = null;
    this.status = false;
    this.route.navigateByUrl('login');
  }
}
