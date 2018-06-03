import { Component } from '@angular/core';
import {GoogleAuthService} from "ng-gapi/lib";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private user: any;


  constructor( private googleAuth: GoogleAuthService) {}

  public signinWithGoogle () {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(res => this.signInSuccessHandler(res));
      });
  }

  public getToken(): string {
    let token: string = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("no token set , authentication required");
    }
    return sessionStorage.getItem("accessToken");
  }

  private signInSuccessHandler(res: any) {
    this.user = res;
    sessionStorage.setItem(
      "accessToken", res.getAuthResponse().access_token
    );
  }

}
