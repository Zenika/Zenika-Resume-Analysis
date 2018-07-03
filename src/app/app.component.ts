import {Component} from '@angular/core';
import {UserService} from "./security/user-service.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  public loading:boolean;

  constructor(private userService : UserService) {

    this.loading = true;

    this.userService.isLogged().then(value => {
      this.loading = false;
      if(!value){
        window.location.href = environment.backendApi+"/login/google?redirect_url_additional="+window.location.origin;
      }
    });
  }


}
