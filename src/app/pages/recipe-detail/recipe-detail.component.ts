import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { DurationPipe } from '../../pipes/duration.pipe';
import { HighlightDirective } from '../../components/directives/highlight.directive';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [DurationPipe, HighlightDirective],
  template: `
    <div class="recipe-detail">
      @if (recipe(); as recipe) {
        <button class="back-button" (click)="goBack()">← Назад</button>
        
        <div class="recipe-header">
          <img [src]="recipe.image" [alt]="recipe.name" class="recipe-image">
          <div class="recipe-title-section">
            <h1>{{ recipe.name }}</h1>
            <div class="recipe-meta">
              <span class="badge" [appHighlight]="'#e3f2fd'">{{ recipe.type }}</span>
              <span class="badge" [appHighlight]="'#f3e5f5'">{{ recipe.difficulty }}</span>
              @if (recipe.isVegetarian) {
                <span class="badge" [appHighlight]="'#e8f5e8'">Вегетарианское</span>
              }
            </div>
          </div>
        </div>

        <div class="recipe-content">
          <div class="recipe-info">
            <div class="info-item">
              <strong>Время подготовки:</strong> {{ recipe.preparationTime | duration }}
            </div>
            <div class="info-item">
              <strong>Время приготовления:</strong> {{ recipe.cookingTime | duration }}
            </div>
            <div class="info-item">
              <strong>Общее время:</strong> {{ recipe.preparationTime + recipe.cookingTime | duration }}
            </div>
            @if (recipe.calories) {
              <div class="info-item">
                <strong>Калории:</strong> {{ recipe.calories }} ккал
              </div>
            }
          </div>

          <div class="recipe-description">
            <h2>Описание</h2>
            <p>{{ recipe.description }}</p>
          </div>

          <div class="recipe-ingredients">
            <h2>Ингредиенты</h2>
            <ul>
              @for (ingredient of recipe.ingredients; track ingredient) {
                <li>{{ ingredient }}</li>
              }
            </ul>
          </div>

          <div class="recipe-instructions">
            <h2>Инструкции</h2>
            <ol>
              @for (step of recipe.instructions; track step; let i = $index) {
                <li>{{ step }}</li>
              }
            </ol>
          </div>
        </div>
      } @else {
        <div class="loading">
          <p>Рецепт не найден</p>
          <button (click)="goBack()">Вернуться к рецептам</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .recipe-detail {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .back-button {
      padding: 0.5rem 1rem;
      margin-bottom: 2rem;
      background: none;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }
    .recipe-header {
      margin-bottom: 2rem;
    }
    .recipe-image {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: 8px;
    }
    .recipe-title-section {
      margin-top: 1rem;
    }
    .recipe-meta {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .recipe-content {
      background-color: #fff;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .recipe-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
    .info-item {
      text-align: center;
    }
    h2 {
      margin: 1.5rem 0 1rem 0;
      color: #333;
    }
    ul, ol {
      margin-left: 1.5rem;
    }
    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
    .loading {
      text-align: center;
      padding: 3rem;
    }
    .loading button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class RecipeDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  
  recipe = signal<ReturnType<typeof this.recipeService.getRecipeById> | undefined>(undefined);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipe.set(this.recipeService.getRecipeById(id));
  }

  goBack() {
    this.router.navigate(['/recipes']);
  }
}