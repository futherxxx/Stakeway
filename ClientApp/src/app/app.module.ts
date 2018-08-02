import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { SelectModule } from 'ng-select'
import { UICarouselModule } from "ui-carousel";
// Modules
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { AuthService } from '../services/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { AdminComponent } from './admin/admin.component';
import { AUTH_PROVIDERS, JwtHelper } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { ProfileComponent } from './profile/profile.component';
import { GamesComponent } from './games/games.component';
import { AlertService } from '../services/alert.service';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { GamesService } from '../services/game.service';
import { HttpModule } from '@angular/http';
import { AuthGuard } from '../services/auth-gaurd.service';
import { TypeService } from '../services/type.service';
import { PremierComponent } from './premier/premier.component';
import { WinlotComponent } from './winlot/winlot.component';
import { GoldenComponent } from './golden/golden.component';
import { RndsComponent } from './rnds/rnds.component';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
import { FilterPipe } from './pipes/filter.pipe';
import{} from 'angular-bootstrap-md'
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavmenuComponent,
    CallbackComponent,
    AdminComponent,
    ProfileComponent,
    GamesComponent,
    AppComponent,
    PremierComponent,
    WinlotComponent,
    ResultComponent,
    GoldenComponent,
    FilterPipe,
    RndsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UICarouselModule,
    SelectModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    GamesService,
    AuthService,
    AuthGuard,
    AlertService,
    TypeService,
    UserService,
    ToastService
    
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
