import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";
import  'rxjs/add/observable/fromPromise';

@Injectable()
export class ElasticsearchService {

  constructor() {
  }


  executePostRequest(request: any): Observable<any> {

    return Observable.fromPromise(new Promise((resolve, reject) => {

      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          resolve(JSON.parse(xhr.response));
        }
      }
      xhr.open('POST', environment.backendApi+"/search", true);

      xhr.withCredentials = true;
      xhr.send(JSON.stringify(request));
    }));
  }

}
