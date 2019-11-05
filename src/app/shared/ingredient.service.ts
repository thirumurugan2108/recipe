import { EventEmitter } from '@angular/core';
import{Subject} from 'rxjs';

import { Ingredient } from './Ingredient.model';

export class IngredientService{
    ingredientsChanged=new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();
    ingredients:Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Lemon',10)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredient(index:number){
          return this.ingredients[index];

      }
      addIngredient(ingredient:Ingredient){
            this.ingredients.push(ingredient);
            return this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients : Ingredient[]){
          this.ingredients.push(...ingredients);
          return this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index:number,newIngredient: Ingredient){
          this.ingredients[index]=newIngredient;
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index : number){
          this.ingredients.splice(index,1);
          this.ingredientsChanged.next(this.ingredients.slice())
      }
}
