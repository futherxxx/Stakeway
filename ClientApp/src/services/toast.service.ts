import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  classes:string[]=["cls-info","cls-warning","cls-success","cls-danger"];
  constructor() { 

  }
  showAlert(ndx:number,txt:string){
    var x = document.getElementById("snackbar");
    x.className = "show "+this.classes[ndx];
    x.innerText=txt;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
}
