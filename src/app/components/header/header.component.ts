import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <h1 class="logo">
          <a routerLink="/">Книга рецептов</a>
        </h1>
        <nav class="nav">
          <ul class="nav-list">
            <li>
              <a 
                routerLink="/" 
                routerLinkActive="active" 
                [routerLinkActiveOptions]="{exact: true}">
                Главная
              </a>
            </li>
            <li>
              <a 
                routerLink="/recipes" 
                routerLinkActive="active">
                Рецепты
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #f8f9fa;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo a {
      text-decoration: none;
      color: #333;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .nav-list {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .nav-list a {
      text-decoration: none;
      color: #666;
      transition: color 0.3s;
      padding: 0.5rem 0;
    }
    .nav-list a:hover,
    .nav-list a.active {
      color: #007bff;
    }
  `]
})
export class HeaderComponent {}