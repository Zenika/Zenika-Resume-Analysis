import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/catch';
import {environment} from "../../environments/environment";

@Injectable()
export class UserService {


  constructor(private http: HttpClient) {
  }


  isLogged() : Promise<boolean> {
    return this.http.get(environment.backendApi+"/user")
      .toPromise()
      .then(res => res != null)
      .catch(err => {
        return false;
      });
  }

  getCurrentUser() : Promise<boolean> {
    return this.http.get(environment.backendApi+"/user")
      .toPromise()
      .then(res => res)
      .catch(err => {
        return null;
      });
  }

}
