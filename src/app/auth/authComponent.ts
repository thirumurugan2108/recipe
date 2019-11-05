import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
    selector:'app-auth',
    templateUrl:'authComponent.html'
})
export class authComponent{
isLoginMode=true;

switchMode(){
    this.isLoginMode=!this.isLoginMode;
}

onSubmit(form : NgForm){
    console.log(form.value);
    form.reset();
}
}