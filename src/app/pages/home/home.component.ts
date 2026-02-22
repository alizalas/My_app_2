import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RecipeCardComponent],
  template: `
    <div class="home">
      <section class="hero">
        <h1>Добро пожаловать в Книгу рецептов</h1>
        <p>Откройте для себя множество вкусных рецептов</p>
        <a routerLink="/recipes" class="cta-button">Смотреть рецепты</a>
      </section>

      <section class="featured">
        <h2>Популярные рецепты</h2>
        <div class="recipes-grid">
          @for (recipe of popularRecipes; track recipe.id) {
            <app-recipe-card [recipe]="recipe" />
          } @empty {
            <p>Нет доступных рецептов</p>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home {
      min-height: 100%;
    }
    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .hero p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    .cta-button {
      display: inline-block;
      padding: 1rem 2rem;
      background-color: white;
      color: #667eea;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      transition: transform 0.3s;
    }
    .cta-button:hover {
      transform: translateY(-2px);
    }
    .featured {
      max-width: 1200px;
      margin: 4rem auto;
      padding: 0 1rem;
    }
    .recipes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
  `]
})
export class HomeComponent {
  private recipeService = inject(RecipeService);
  popularRecipes = this.recipeService.getAllRecipes()().slice(0, 3);
}