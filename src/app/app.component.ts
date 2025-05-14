import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UniversiteService } from './services/universite.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Produit';

  constructor(
    public authService: AuthService,
    private universiteService: UniversiteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken() && !this.authService.isTokenExpired()) {
      this.authService.isloggedIn = true;
      this.authService.decodeJWT(); 
    } else {
      this.authService.logout();
    }
  }


  onLogout() {
    this.authService.logout();
  }

}
