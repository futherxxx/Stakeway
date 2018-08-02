import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { GamesComponent } from './games/games.component';
import { AuthGuard } from '../services/auth-gaurd.service';
import { PremierComponent } from './premier/premier.component';
import { WinlotComponent } from './winlot/winlot.component';
import { GoldenComponent } from './golden/golden.component';
import { RndsComponent } from './rnds/rnds.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent , data:{state:'home'} },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent ,data:{state:'admin'}, canActivate:[AuthGuard]},
  // { path: 'profile', component: ProfileComponent,data:{state:'home'}},
  { path: 'games', component: GamesComponent ,data:{state:'admin'}, canActivate:[AuthGuard]},
  { path: 'premier', component: PremierComponent ,data:{state:'premier'}, canActivate:[AuthGuard]},
  { path: 'winlot', component: WinlotComponent ,data:{state:'winlot'}, canActivate:[AuthGuard]},
  { path: 'golden', component: GoldenComponent ,data:{state:'golden'}, canActivate:[AuthGuard]},
  { path: 'rnds', component: RndsComponent ,data:{state:'rnds'}, canActivate:[AuthGuard]},
  
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
