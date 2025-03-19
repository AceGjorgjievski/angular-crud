import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RightSidebarComponent } from '../sidebars/right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from '../sidebars/left-sidebar/left-sidebar.component';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    RightSidebarComponent,
    LeftSidebarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
