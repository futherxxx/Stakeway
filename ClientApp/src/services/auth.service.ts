// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { default as decode } from 'jwt-decode';
import { User } from '../models/user';
import { UserService } from './user.service';
(window as any).global = window;

@Injectable()
export class AuthService {
  static roles: any[] = [];
  static loggedIn:boolean=false;
  auth0 = new auth0.WebAuth({
    clientID: 'utoF7mgF9tT9lO04MCkezoKt47kezHqQ',
    domain: 'stakeway.auth0.com',
    responseType: 'token id_token',
    audience: 'https://stakeway.auth0.com/userinfo',
    redirectUri: 'http://stakeway.apphb.com/callback',
    scope: 'openid user email profile read:messages write:messages'
  });
  user={} as User;
  public userProfile:any;
  constructor(public router: Router, private userService:UserService) {
    var token = localStorage.getItem('id_token');
    if (token) {
      var decodedToken = decode(token);
      AuthService.roles = decodedToken['http://stakeway.apphb.com/app_metadata/roles/'];
      setTimeout(() => {
        console.log(AuthService.roles);
      }, 5000);

    }
  }
  public isInRole(roleName: string): boolean {
    return AuthService.roles.indexOf(roleName) > -1;
  }
  public login(): void {
    this.auth0.authorize();
  }
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        AuthService.loggedIn=true;
        this.router.navigate(['/home']);

      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);


  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    AuthService.roles = [];
    AuthService.loggedIn=true;
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
  private createUser(userId,email){
      this.user.userId=userId;
      this.user.name=email;
      this.userService.createUser(this.user).subscribe(res => console.log(res));
  }
  public getProfile(cb: any): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken,
      (err, profile) => {
        if (profile) {
          self.userProfile = profile;
          console.log(profile);
          this.createUser(profile.sub,profile.email);
        }
        cb(err, profile);
        cb(err, profile);
      });
  }
}
