import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map , tap} from 'rxjs/operators'

import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn : 'root'})
export class DataStorageService{
constructor(private httpClient:HttpClient,private recipeService: RecipeService){}

storeRecipes(){
    const recipes=this.recipeService.getRecipes();
    this.httpClient.put('https://recipe-dd0ca.firebaseio.com/recipes.json',recipes).subscribe(
    response=>{    
    console.log(response);
    }
    );
}

fetchRecipes(){
    return this.httpClient.get<Recipe[]>('https://recipe-dd0ca.firebaseio.com/recipes.json')
    .pipe(map(recipes=>{
        return recipes.map(recipe=>{
            return {...recipe,ingredients : recipe.ingredients ? recipe.ingredients: []
            }
        });
    })
    ,tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
    ); 
    
}


}