import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    
    constructor(private http:Http) { }
  baseUrl: string ="http://stakeway.apphb.com/api/users";

    createUser(user){
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl,JSON.stringify(user),options)
        .map(this.extractData)
        .catch(this.handleError);
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
