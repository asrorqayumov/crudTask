import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  styles: `
      .ms-2{
        margin-left:20px
      }
    `,
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  constructor() {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
