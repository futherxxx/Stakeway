import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
//testing
import { GAME } from '../../classes/GAME.class';
import { Game, GameTypes } from '../../models/game.model';
import { GamesService } from '../../services/game.service';
import { TypeService } from '../../services/type.service';
import { Type } from '../../models/type';
import { FormControl } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  game={} as Game;
  gameTypes:Type[];
  selectedGameTypes:Type[];
  type:Type={
   id:0,
   name:''
  };
  deleteGamePopup(game){
    this.game=game;
    $("#deleteModal").css({"display":"block"});
  }
  closeDeletePopup(){
    $("#deleteModal").css({"display":"none"});
  }
  list: GAME[] = [];
  games:Game[];
  l: any;
  constructor(private auth: AuthService, private gameService:GamesService, private typeService:TypeService,private toast:ToastService) {
    this.auth.handleAuthentication();
    // this.game= new Game();
    this.list = [];
    this.game.gameTypes=[];
    this.gameTypes=[];
    this.temp=new GameTypes();
    this.selectedGameTypes=[];
    // this.gameTypes=[];
  }
  ngOnInit() {
    this.getAllGames();
    if (this.auth.userProfile) {
      this.game.createdBy = this.auth.userProfile.email;
      this.game.modifiedBy= this.auth.userProfile.email;
  } else {
      this.auth.getProfile((err: any, profile: any) => {
        this.game.createdBy = this.auth.userProfile.email;
        this.game.modifiedBy= this.auth.userProfile.email;
      });

    }


    this.list = [];
    if (localStorage.getItem('testingItem') != null) {
      this.list = JSON.parse(localStorage.getItem('testingItem'));
      this.getDistiinctAgentsIds(this.list);
    }
  }
  closeModal(){
    $("#fullHeightModalRight").css({"display":"none"});
    this.game={} as Game;
    this.getAllGames();
    this.game.id=0;
    // $("#fullHeightModalRight").css({"data-backdrop":"false"});
    if (this.auth.userProfile) {
      this.game.createdBy = this.auth.userProfile.email;
      this.game.modifiedBy= this.auth.userProfile.email;
  } else {
      this.auth.getProfile((err: any, profile: any) => {
        this.game.createdBy = this.auth.userProfile.email;
        this.game.modifiedBy= this.auth.userProfile.email;
      });

    }

  }
  getAllTypes(){
    this.typeService.getAllTypes().subscribe(res => this.gameTypes= res );
  }
  openModal(){
    $("#fullHeightModalRight").css({"display":"block"});
    $("#fullHeightModalRight").addClass("data-backdrop");
    $("#fullHeightModalRight").css({"padding-left:":"10px"});
  }
  openTypeModal(){
    $("#addTypeModal").css({"display":"block"});
    $("#addTypeModal").css({"padding-left:":"10px"});
  
  }
  closeTypeModal(){
    $("#addTypeModal").css({"display":"none"});
  }
addType(){
  
    this.typeService.addType(this.type).subscribe(res => console.log(res));
}

  openSelectedModal(game){
    $("#fullHeightModalRight").css({"display":"block"});
    this.game=game;
  }
  getDistiinctAgentsIds(gameList: GAME[]) {
    this.l = [];
    for (var i = 0; i < gameList.length; i++) {
      if (!this.alreadyExistsIn(this.l, gameList[i].agent_id)) {
        this.l.push(gameList[i].agent_id);
      }
    }
  }
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  selectedType = new FormControl();
  onOut(){
    console.log("Value after losing focus  is",this.selectedGameTypes);
  }
  temps:GameTypes[];

  temp :GameTypes;
  addToGameTypes(typeName){
    this.temp={
      id:0,
      type:typeName
    }
    this.game.gameTypes.push(this.temp);
    console.log(this.game.gameTypes);
  }
  addGame(){
    this.gameService.addGame(this.game).subscribe(res=> {
      this.game.gameTypes=[];
      this.getAllGames();
      this.toast.showAlert(2,"Added Successfully");
    });
  }
 getAllGames(){
   this.gameService.getGames().subscribe(res => {
     this.games=res;
      console.log(this.games);
    });  
 }
 deleteGame(){
   this.gameService.deleteGame(this.game.id).subscribe(res =>{
     this.getAllGames();
     $("#deleteModal").css({"display":"none"});
     this.game={} as Game;
   });
 }
  alreadyExistsIn(ids: any[], id) {
    var flag: boolean = false;
    for (var j = 0; j < ids.length; j++) {
      if (ids[j] == id) {
        return true;
      }
    }
    return flag;
  }
}
