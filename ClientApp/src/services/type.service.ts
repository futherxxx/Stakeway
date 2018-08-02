import { Injectable } from '@angular/core';
import { Http , Headers,RequestOptions} from '@angular/http';
import { Type } from '../models/type';
import { GameTypes } from '../models/game.model';

@Injectable()
export class TypeService {
    
    constructor(private http:Http) { }
  baseurl: string ="http://stakeway.apphb.com/api/types";

    getAllTypes(){
        return this.http.get(this.baseurl).map(res => res.json());
    }
    addType(type:Type){
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });    
        return this.http.post(this.baseurl,type,options);
    }
    addTypes(gameType:GameTypes[]){
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });    
        return this.http.post('http://localhost:54208/api/gametypes',gameType,options);
    }
}
