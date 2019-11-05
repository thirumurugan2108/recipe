import {  Injectable } from '@angular/core';


import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './Ingredient.model';
import { IngredientService } from './ingredient.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipesChanged=new Subject<Recipe[]>();
    // private recipes:Recipe[]=[
    //     new Recipe('A test Recipe','This is a simply test','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoK2kqqMMJ__VT5lcLXa9hzNZAkWKOwq2Y-SIGiTtXz_wLdBq4xw'
    //     ,[new Ingredient("carrot",15),new Ingredient("fig",10)]),

    //     new Recipe('A test Recipe',
    //     'This is a simply test',
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoK2kqqMMJ__VT5lcLXa9hzNZAkWKOwq2Y-SIGiTtXz_wLdBq4xw',
    //     [new Ingredient("orange",5),new Ingredient("fig",10)])
        
    //   ];

      private recipes:Recipe[];
      constructor(private ingredientService:IngredientService) { }
      
      getRecipes(){
        return this.recipes.slice();
      }

      addIngredientsToShopping(ingredient: Ingredient[]){
          this.ingredientService.addIngredients(ingredient);
      }

      getRecipe(index: number){
        return this.recipes[index];
      }

      addRecipe(recipe : Recipe){
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe : Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }

      setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
}