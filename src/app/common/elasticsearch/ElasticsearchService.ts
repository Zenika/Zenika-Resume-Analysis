import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ElasticsearchService {

  private API_URL = 'http://localhost:9200/';

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }


  executePostRequest(request: any, actionUrl: String): Observable<any> {
    return this.http.post(this.API_URL + actionUrl, request, {headers : this.headers}).map(data =>{
      return data;
    });
  }

}
