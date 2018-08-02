import { Component, OnInit, Input, QueryList, ViewChildren, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { forEach } from '@angular/router/src/utils/collection';
import { Game } from '../../models/game.model';
import { isNullOrUndefined } from 'util';
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { Bet } from "../../classes/bet.class";
import { element } from 'protractor';
import { GAME, GAMEPLAY } from '../../classes/GAME.class';
import { USER } from '../../classes/USERS.class';
import { GamesService } from '../../services/game.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import * as auth0 from 'auth0-js';
import { ToastService } from '../../services/toast.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, AfterViewInit {
  @ViewChild('betList') betList: ElementRef;
  @Input() fileText: string;
  btnStyle2: string;
  txtStyle: string;
  numbers: number[];
  gamenumbers: number[][] = [];
  rows: number = 90;
  cols: number = 10;
  val: number = 1;
  btnStyle: string;
  gamestyle: any[];
  gametypes: string[] = ["Please Select Game to Begin"];
  btnIdentifier: any[];
  betNo: number = 0;
  public selectedNumbers: Array<number> = [];
  selectedGame: Game;
  currentGame: Game[];
  public selectedClone: number[] = this.selectedNumbers.copyWithin(0, 0);
  StakeAmount: number = 0.0;
  betingList: Bet[] = [];
  totalstack: number = 0.0;
  player: string = "";
  isPlayingAsAgent: boolean = false;
  game: GAME;
  listofusers:USER[];
  gameTypeOpt: string = "NAP2";
  playersQuery:string="";
  @ViewChildren('ball') components: QueryList<ElementRef>;
  constructor(
    private alertService: AlertService,
    private gameService:GamesService,
    public  auth: AuthService,
    private toast:ToastService
  ) {
    this.betingList = [];
    this.game = new GAME();
    this.listofusers=[];
  }

  ngOnInit() {
    console.log(this.fileText);
    this.addusers();
    this.numbers = Array(this.rows).fill(this.rows).map((x, i) => i + 1); 
    for (var i = 0; i < this.cols - 1; i++) {
      this.gamenumbers.push(this.numbers.slice(this.val - 1, this.cols * (i + 1)));
      this.val += 10;
      this.player = "";
    }
    for (var i = 0; i < length; i++) {
      this.gamestyle[i] = "restingGame";
    }
    this.btnStyle = "restingballs";
  }

  ngAfterViewInit() {
  }

  ballclick(ball: number) {

    let currIndex = this.selectedNumbers.indexOf(ball);
    this.highLightSelectedBalls();

    if (currIndex == -1) {
      this.selectedNumbers.push(ball);
    }
    else {
      this.selectedNumbers.splice(currIndex, 1);
    }
    let nums = 0;
    if (this.gameTypeOpt.indexOf("NAP") > -1) {
      nums = parseInt(this.gameTypeOpt.substring(3, 4));
    } else {
      var g = new Greeter();
      var n = 3;
      var nFac = g.factorial(n);
      var r = 2;
      g = new Greeter();
      var nMinusRFact = g.factorial(n - r);
      nums = parseInt((nFac / nMinusRFact)+"");
    }
    if (this.selectedNumbers.length >nums) {
      let el: any = this.components;
      this.alertService.showMessage("Error", `You cannot select more than two balls`, MessageSeverity.error);
      let result = el.find(bb => bb.nativeElement.id === 'ball_' + this.selectedNumbers[nums]).nativeElement as HTMLElement;
      result.click();
    }
    this.highLightSelectedBalls();
  }
count:number=0;
  getAllGames(){
    this.gameService.getGamesByOrganization(this.fileText).subscribe(res => {
      this.currentGame=res; 
      this.currentGame.forEach((game) => { 
        if(this.count==0){
          game.gameTypess= ["PNAP2", "PNAP3", "PNAP4"];
          this.selectedGame = this.currentGame[game.id];
          this.selectedGame = this.currentGame[game.id];
          game.gameTypes = this.currentGame[game.id].gameTypes;
          this.count++;
        }
        game.gameTypess= ["PNAP2", "PNAP3", "PNAP4"];
        game.gameSelected=false;
      });
    });  
  }
  SelectGame(game: number,g:Game) {
    this.txtStyle = "activegame";
    g.gameSelected = true;
    for (var i = 0; i < this.currentGame.length; i++) {
      this.currentGame[i].gameSelected = false;
    }
    g.gameTypes = this.currentGame[game].gameTypes;
    this.currentGame[game].gameSelected = !this.currentGame[game].gameSelected;
    this.selectedGame = this.currentGame[game];
    let el: any = this.components;
    if (el != undefined) {
      for (var i = 0; i < this.selectedNumbers.length; i++) {
        let result = el.find(bb => bb.nativeElement.id === 'ball_' + this.selectedNumbers[i]).nativeElement as HTMLElement;
        if (!isNullOrUndefined(result)) {
          result.click();
          if (i > -1) {
            i--;
          }
        }
      }
    }
  }
  GameExpired(game: number) {
     this.currentGame[game - 1].gameExpired = true;
  }
  ClearBoard() {
    let el: any = this.components;
    if (el != undefined) {
      for (var i = 0; i < this.selectedNumbers.length; i++) {
        let result = el.find(bb => bb.nativeElement.id === 'ball_' + this.selectedNumbers[i]).nativeElement as HTMLElement;
        if (!isNullOrUndefined(result)) {
          result.click();
          if (i > -1) {
            i--;
          }
        }
      }
    }
    this.StakeAmount = 0.00;
  }
  ProcessStake() {
    console.log('Stake Amount ' + this.StakeAmount);
    console.log('Ball numbers ' + this.selectedNumbers)
  }
  addBetToList() {
      this.betNo = this.betNo + 1;
      let bet: Bet = new Bet();
      bet.srNo = this.betNo;
      bet.numbers = this.selectedNumbers;
      bet.stack = this.StakeAmount;
      bet.type = 'Mark I';
      bet.lines = 1;
      this.betingList.push(bet);
  }
  login() {
    this.auth.login();
  }
  sumTotalStack(): number {
    var t: number = 0;
    this.betingList.forEach(element => {
      t += element.stack;
    });
    if (t == NaN) {
      t = 0;
    }
    return t;
  }
  removeBet(param: any) {
    if (this.betingList.length > 0) {
      this.betingList.splice(parseInt(param), 1);
    }
  }
  addToStack(index, amount) {
    this.betingList[index].stack = parseInt(amount);
    this.sumTotalStack();
  }
  placebet(isauth) {
    if (this.betingList.length > 0) {
      this.gameCompleted();
      if (this.auth.isAuthenticated()) {
        this.toast.showAlert(0,"Bets have been added succesfully");
      } else if (!this.auth.isAuthenticated()) {
        this.auth.login();
        this.toast.showAlert(0,'bet placed');        
      }
    }
  }
  highLightSelectedBalls() {
      for (var i = 0; i <= 90; i++) {
        $("#ball_" + i).css({
          "background-color": "cornflowerblue",
          "color": "black"
        });
      }
      for (var i = 0; i < this.selectedNumbers.length; i++) {
        $("#ball_" + this.selectedNumbers[i]).css({
          "background-color": "darkblue",
          "color": "white"
        });
      };
    
  }
  playAsAgent() {
    this.openModal();
  }
   gameCompleted() {
    var list = [];
    location.href = "#/admin";
  }
  clear() {
    this.betingList=[];
  }
  closeModal(){
    $("#myModal").css({"display":"none"});
  }
  openModal(){
    $("#myModal").css({"display":"block"});
  }
  @HostListener('document:click',['$event']) 
  onDocumentClick(event:MouseEvent){
    if(event.target==document.getElementById('myModal')){
      $("#myModal").css({"display":"none"});
    }
  }
 addusers(){
   var u1=new USER();
   u1.id=0;
   u1.name="Waqas Ahmad";
   u1.username="ekaur45";
   this.listofusers.push(u1);

   var u2=new USER();
   u2.id=1;
   u2.name="Shaikh Qasim";
   u2.username="shaikh";
   this.listofusers.push(u2);
   
 }
  expired(_game) {    
    if ((new Date(_game.endTime).getTime() - new Date().getTime()) > 0) {
      return true;
    } else {
      return false;
    }
  }
  addPlayer(uname){
    this.player = uname;
    this.isPlayingAsAgent = true;
  }
}
class Greeter {
  fact: number= 1;
  constructor() {
    this.fact=0;
      this.fact = 1;
  }
  factorial(num: number): number {
    if (num > 0) {
      this.fact = this.fact * num;
      this.factorial(num - 1);
    }
    return this.fact;
  }
}
