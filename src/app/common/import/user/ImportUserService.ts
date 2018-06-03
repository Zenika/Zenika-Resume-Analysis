import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ImportUserService {

  private API_URL = 'http://localhost:8080/index-users';

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    // this.headers = new HttpHeaders();
    // this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }


  execute(): Observable<any> {
    // let params = new HttpParams().set('limit',"115");
    // this.http.get(this.API_URL ,{params : params});

    return this.http.get(this.API_URL );
  }

}
