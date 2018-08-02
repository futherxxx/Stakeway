import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Game, GameTypes } from '../models/game.model';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';



@Injectable()
export class GamesService {
    
    constructor(private http:Http) { }
    baseUrl:string="http://localhost:54208/api/games";
    getGames(){
       return  this.http.get(this.baseUrl).map(res => res.json());
    }
    getGamesByOrganization(org){
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        console.log(this.baseUrl+'/'+org);
        return  this.http.get(this.baseUrl+'/'+org,options).map(res => res.json());
    }
    addGame(game:Game) :Observable<any> {

        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl,JSON.stringify(game),options)
        .map(this.extractData)
        .catch(this.handleError);
    }
    deleteGame(id){
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });    
       return  this.http.delete(this.baseUrl+'/'+id,options);
    }
    private extractData(res: any) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}