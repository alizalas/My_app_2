import { Injectable, signal } from '@angular/core';
import { Recipe, RecipeType } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes = signal<Recipe[]>([]);

  constructor() {
    this.loadRecipes();
  }

  getAllRecipes() {
    return this.recipes.asReadonly();
  }

  getRecipeById(id: number): Recipe | undefined {
    return this.recipes().find(recipe => recipe.id === id);
  }

  filterRecipes(filters: { type?: RecipeType; maxTime?: number; searchTerm?: string }): Recipe[] {
    return this.recipes().filter(recipe => {
      let matches = true;
      
      if (filters.type && recipe.type !== filters.type) {
        matches = false;
      }
      
      if (filters.maxTime && (recipe.preparationTime + recipe.cookingTime) > filters.maxTime) {
        matches = false;
      }
      
      if (filters.searchTerm) {
        const search = filters.searchTerm.toLowerCase();
        matches = matches && (
          recipe.name.toLowerCase().includes(search) ||
          recipe.description.toLowerCase().includes(search)
        );
      }
      
      return matches;
    });
  }

  private loadRecipes() {
    const mockRecipes: Recipe[] = [
      {
        id: 1,
        name: 'Борщ',
        image: '/images/borscht.jpg',
        description: 'Традиционное первое блюдо',
        ingredients: ['свекла', 'капуста', 'морковь', 'картофель'],
        instructions: ['Нарезать овощи', 'Сварить бульон', 'Добавить овощи'],
        preparationTime: 20,
        cookingTime: 60,
        type: 'soup',
        difficulty: 'medium',
        calories: 150,
        isVegetarian: false,
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Оливье',
        image: '/images/olivier.jpg',
        description: 'Классический салат',
        ingredients: ['картофель', 'морковь', 'горошек', 'колбаса'],
        instructions: ['Отварить овощи', 'Нарезать', 'Смешать'],
        preparationTime: 30,
        cookingTime: 30,
        type: 'lunch',
        difficulty: 'easy',
        calories: 250,
        isVegetarian: false,
        createdAt: new Date()
      },
      {
        id: 3,
        name: 'Морс',
        image: '/images/morse.jpg',
        description: 'Освежающий напиток из ягод',
        ingredients: ['клюква', 'сахар', 'вода'],
        instructions: ['Размять ягоды', 'Добавить сахар', 'Залить водой'],
        preparationTime: 10,
        cookingTime: 0,
        type: 'drink',
        difficulty: 'easy',
        calories: 80,
        isVegetarian: true,
        createdAt: new Date()
      }
    ];
    
    this.recipes.set(mockRecipes);
  }
}