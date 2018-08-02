import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-winlot',
  templateUrl: './winlot.component.html',
  styleUrls: ['./winlot.component.scss']
})
export class WinlotComponent implements OnInit {
  @ViewChild('gameChild') child;

  constructor() { }
  fileText:any='Winlot Lotto';
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.child.getAllGames();
 }
}
