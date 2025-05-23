import { Component, inject} from '@angular/core';
import { Router,RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { FooterComponent } from "./layout/footer/footer.component";

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent,RouterModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HelpConnect';
  router = inject(Router);
  shouldShowLayout() {
    
    return this.router.url !== '/login';
  }
}
