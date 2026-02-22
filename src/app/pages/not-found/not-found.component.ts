import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>Извините, запрашиваемая страница не существует.</p>
      <a routerLink="/" class="home-link">Вернуться на главную</a>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      padding: 4rem 1rem;
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    h1 {
      font-size: 6rem;
      color: #007bff;
      margin: 0;
    }
    h2 {
      font-size: 2rem;
      color: #333;
      margin: 1rem 0;
    }
    p {
      color: #666;
      margin-bottom: 2rem;
    }
    .home-link {
      padding: 0.75rem 1.5rem;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .home-link:hover {
      background-color: #0056b3;
    }
  `]
})
export class NotFoundComponent {}