import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,LoginPageComponent,NavbarComponent
  ],

  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})




export class AppComponent {
  title = 'loginRegiFE';
}
