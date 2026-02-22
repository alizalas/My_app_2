import { Component, inject, signal, computed } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RecipeFilterComponent } from '../../components/recipe-filter/recipe-filter.component';
import { RecipeType } from '../../models/recipe.model';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeCardComponent, RecipeFilterComponent],
  template: `
    <div class="recipes-page">
      <h1>Все рецепты</h1>
      
      <app-recipe-filter 
        (onFilterChange)="applyFilters()"
        [(searchTerm)]="searchTerm"
        [(selectedType)]="selectedType"
        [(maxTime)]="maxTime"
      />

      <div class="recipes-grid">
        @for (recipe of filteredRecipes(); track recipe.id) {
          <app-recipe-card 
            [recipe]="recipe" 
            (onCardClick)="navigateToRecipe($event)"
          />
        } @empty {
          <div class="no-results">
            <p>Рецепты не найдены</p>
            <button (click)="resetFilters()">Сбросить фильтры</button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .recipes-page {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .recipes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      background-color: #f8f9fa;
      border-radius: 8px;
    }
    .no-results button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class RecipesComponent {
  private recipeService = inject(RecipeService);
  private allRecipes = this.recipeService.getAllRecipes();
  
  searchTerm = signal<string>('');
  selectedType = signal<RecipeType | ''>('');
  maxTime = signal<number>(180);

  filteredRecipes = computed(() => {
    return this.recipeService.filterRecipes({
      searchTerm: this.searchTerm(),
      type: this.selectedType() || undefined,
      maxTime: this.maxTime()
    });
  });

  applyFilters() {
  }

  resetFilters() {
    this.searchTerm.set('');
    this.selectedType.set('');
    this.maxTime.set(180);
  }

  navigateToRecipe(id: number) {
  }
}