import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { IngredientService } from '../shared/ingredient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients:Ingredient[];
  private idChngeSub : Subscription

  constructor(private ingredientService:IngredientService) { }

  ngOnInit() {
    this.ingredients=this.ingredientService.getIngredients();
    this.idChngeSub=this.ingredientService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    })
  }

  // onIngredientAdded(ingredient : Ingredient){
  //   this.ingredients.push(ingredient);
  // }

  onEditItem(index:number){
    this.ingredientService.startedEditing.next(index);
  }
  ngOnDestroy(){
    this.idChngeSub.unsubscribe;
  }
}
