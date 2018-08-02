import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
    
})
export class ProfileComponent implements OnInit {

    profile: any;

    constructor(public auth: AuthService) { }

    ngOnInit() {       
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
        } else {
            this.auth.getProfile((err: any, profile: any) => {
                this.profile = profile;
            });
        }
    }
    
}