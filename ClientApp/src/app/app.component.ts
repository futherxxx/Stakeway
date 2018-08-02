import { Component, OnInit } from '@angular/core';
import {trigger, animate, style, group, animateChild, query, stagger, transition, animation} from '@angular/animations';
import { AuthService } from '../services/auth.service';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width:'100%' })
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
    ])
  ])
])

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routerTransition ]
})

export class AppComponent implements OnInit{
  constructor(public auth:AuthService){
    this.auth.handleAuthentication();
  }
  homeActive:boolean;
  profile: any;


  ngOnInit() {       
      if (this.auth.userProfile) {
          this.profile = this.auth.userProfile;
      } else {
          this.auth.getProfile((err: any, profile: any) => {
              this.profile = profile;
          });
      }
  }
  getState(outlet) {
    if(outlet.activatedRouteData.state !='home')
      this.homeActive=true;
    else
      this.homeActive=false;
    return outlet.activatedRouteData.state;
  }
  title = 'app';
}
