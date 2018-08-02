import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-golden',
  templateUrl: './golden.component.html',
  styleUrls: ['./golden.component.scss']
})
export class GoldenComponent implements OnInit {
  @ViewChild('gameChild') child;

  constructor() { }
  fileText:any='Golden Chance Lotto';
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.child.getAllGames();
 }
}
