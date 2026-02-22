import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <p>&copy; {{currentYear}} Книга рецептов. Все права защищены.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #333;
      color: white;
      padding: 2rem 0;
      margin-top: auto;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      text-align: center;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}