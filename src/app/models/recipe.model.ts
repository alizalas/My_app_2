export type RecipeType = 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'drink' | 'soup';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  preparationTime: number;
  cookingTime: number;
  type: RecipeType;
  difficulty: Difficulty;
  calories?: number;
  isVegetarian: boolean;
  createdAt: Date;
}