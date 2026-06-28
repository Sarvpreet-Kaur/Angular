import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {

  isSidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // Current Logged-in User
  get loggedUser() {
    return this.authService.getCurrentUser();
  }

  // Toggle Sidebar
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Logout
  logoff(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}