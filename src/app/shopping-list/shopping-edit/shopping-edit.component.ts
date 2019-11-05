import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { IngredientService } from 'src/app/shared/ingredient.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  subscription:Subscription;
  editMode=false;
  editItemIndex:number;
  editedItem:Ingredient;
  @ViewChild('f',{static:false}) slForm:NgForm;
  // @ViewChild('inputAmount',{static:false}) inputAmountEle:ElementRef;
  @Output() ingredient=new EventEmitter<Ingredient>();
  constructor(private ingredientService:IngredientService) { }

  ngOnInit() {
    this.subscription=this.ingredientService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editItemIndex=index;
        this.editedItem=this.ingredientService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount        })
      }
    );
  }

    onSubmitItem(form : NgForm){
      // const ingName=this.inputNameEle.nativeElement.value;
      // const ingAmount=this.inputAmountEle.nativeElement.value;
      // this.ingredient.emit(new Ingredient(ingName,ingAmount));
      const value=form.value;
      const newIngredient=new Ingredient(value.name, value.amount);
      console.log(value);
      if(this.editMode){
        this.ingredientService.updateIngredient(this.editItemIndex,newIngredient);
      }
      else{
        this.ingredientService.addIngredient(new Ingredient(value.name,value.amount));
      }
      this.editMode=false;
      form.reset();

  }
  onDelete(){
    this.ingredientService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}