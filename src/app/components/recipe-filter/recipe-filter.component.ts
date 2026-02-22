import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeType } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="filters">
      <h3>Фильтры</h3>
      
      <div class="filter-group">
        <label for="search">Поиск по названию:</label>
        <input
          type="text"
          id="search"
          [(ngModel)]="searchTerm"
          (ngModelChange)="onFilterChange.emit()"
          placeholder="Введите название..."
          class="filter-input"
        >
      </div>

      <div class="filter-group">
        <label for="type">Тип блюда:</label>
        <select
          id="type"
          [(ngModel)]="selectedType"
          (ngModelChange)="onFilterChange.emit()"
          class="filter-input"
        >
          <option value="">Все типы</option>
          <option value="breakfast">Завтрак</option>
          <option value="lunch">Обед</option>
          <option value="dinner">Ужин</option>
          <option value="dessert">Десерт</option>
          <option value="drink">Напиток</option>
          <option value="soup">Суп</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="maxTime">Макс. время (мин):</label>
        <input
          type="range"
          id="maxTime"
          [(ngModel)]="maxTime"
          (ngModelChange)="onFilterChange.emit()"
          min="0"
          max="180"
          step="15"
          class="filter-range"
        >
        <span>{{ maxTime() }} мин</span>
      </div>

      <button class="clear-filters" (click)="clearFilters()">Сбросить фильтры</button>
    </div>
  `,
  styles: [`
    .filters {
      background-color: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    .filter-group {
      margin-bottom: 1rem;
    }
    .filter-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }
    .filter-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .filter-range {
      width: 100%;
    }
    .clear-filters {
      padding: 0.5rem 1rem;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class RecipeFilterComponent {
  searchTerm = model<string>('');
  selectedType = model<RecipeType | ''>('');
  maxTime = model<number>(180);
  
  onFilterChange = output<void>();

  clearFilters() {
    this.searchTerm.set('');
    this.selectedType.set('');
    this.maxTime.set(180);
    this.onFilterChange.emit();
  }
}