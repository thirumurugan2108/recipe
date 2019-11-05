import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from './recipe.model';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
 
})
export class RecipesComponent implements OnInit {

  selectedRecipe:Recipe;
  constructor() { }

  ngOnInit() {
    
  }

}
