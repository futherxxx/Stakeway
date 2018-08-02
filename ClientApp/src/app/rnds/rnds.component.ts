import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rnds',
  templateUrl: './rnds.component.html',
  styleUrls: ['./rnds.component.scss']
})
export class RndsComponent implements OnInit {
  @ViewChild('gameChild') child;

  constructor() { }
  fileText:any='R&S Lotto';
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.child.getAllGames();
 }
}
