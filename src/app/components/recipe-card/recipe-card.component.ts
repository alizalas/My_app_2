import { Component, input, output } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RouterLink } from '@angular/router';
import { DurationPipe } from '../../pipes/duration.pipe';
import { HighlightDirective } from '../directives/highlight.directive';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink, DurationPipe, HighlightDirective],
  template: `
    @if (recipe(); as recipeData) {
      <div class="recipe-card" (click)="onCardClick.emit(recipeData.id)">
        <img [src]="recipeData.image" [alt]="recipeData.name" class="recipe-image">
        <div class="recipe-content">
          <h3 class="recipe-title">{{ recipeData.name }}</h3>
          <p class="recipe-description">{{ recipeData.description }}</p>
          <div class="recipe-meta">
            <span class="recipe-time">
              Время: {{ recipeData.preparationTime + recipeData.cookingTime | duration }}
            </span>
            <span class="recipe-type" [appHighlight]="'#e3f2fd'">
              {{ recipeData.type }}
            </span>
          </div>
          @if (recipeData.isVegetarian) {
            <span class="vegetarian-badge">Вегетарианское</span>
          }
          <a [routerLink]="['/recipes', recipeData.id]" class="view-recipe">Смотреть рецепт →</a>
        </div>
      </div>
    }
  `,
  styles: [`
    .recipe-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
    }
    .recipe-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .recipe-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .recipe-content {
      padding: 1rem;
    }
    .recipe-title {
      margin: 0 0 0.5rem 0;
      color: #333;
    }
    .recipe-description {
      color: #666;
      margin-bottom: 1rem;
    }
    .recipe-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .vegetarian-badge {
      display: inline-block;
      padding: 0rem 0.5rem;
      background-color: #28a745;
      color: white;
      border-radius: 4px;
      font-size: 0.875rem;
      margin-right: 0.5rem;
    }
    .view-recipe {
      display: inline-block;
      color: #007bff;
      text-decoration: none;
    }
  `]
})
export class RecipeCardComponent {
  recipe = input.required<Recipe>();
  onCardClick = output<number>();
}