import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from "./about/about.component";
import { MenuComponent } from "./menu/menu.component";
import { HeroComponent } from './hero/hero.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'pb-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, HeroComponent, AboutComponent, HttpClientModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personal-budget';
}
