import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from "../../../../environments/environment";


@Injectable()
export class ImportUserService {

  constructor(private http: HttpClient) {}

  execute(): Observable<any> {
    return this.http.get(environment.backendApi+"/index-users", { withCredentials: true })
  }

}
