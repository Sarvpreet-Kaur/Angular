import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  isSidebarOpen:boolean=false
  router = inject(Router)

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen
  }

  logoff(){
    this.router.navigateByUrl('login')
  }
}
