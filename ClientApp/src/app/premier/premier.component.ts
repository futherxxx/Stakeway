import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-premier',
  templateUrl: './premier.component.html',
  styleUrls: ['./premier.component.scss']
})
export class PremierComponent implements OnInit {

  constructor() { }
  @ViewChild('gameChild') child;
  getOrganization(e:any){

  }
  fileText:any='Premier Lotto';

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.child.getAllGames();
 }

}
