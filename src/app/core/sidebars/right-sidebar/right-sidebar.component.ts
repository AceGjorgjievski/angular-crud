import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-right-sidebar',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.css'
})
export class RightSidebarComponent {

}
