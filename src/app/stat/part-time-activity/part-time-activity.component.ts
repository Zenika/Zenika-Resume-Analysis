import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ElasticsearchService} from "../../common/elasticsearch/ElasticsearchService";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-part-time-activity',
  templateUrl: './part-time-activity.component.html',
  styleUrls: ['./part-time-activity.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PartTimeActivityComponent implements OnInit {

  expanded: boolean = false;

  resultHobbies : any;

  hobbieMode: string = 'autocomplete';

  hobbieModeChoices = [
    {key:"match",text : "recherche exact"},
    {key:"fuzzy",text : "recherche approximative"},
    {key:"autocomplete",text : "recherche accompagnée"}
  ];
  hobbieText: string;
  hobbieFuzzy: number = 2;
  hobbieAutoComplete: string;
  queryStructHobbieAuto: any;

  constructor(private elasticsearchService : ElasticsearchService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('assets/users_hobbie_autocomplete').subscribe((value:any)=> {
      this.queryStructHobbieAuto = value;
    });
  }

  observableSource = (keyword: any): Observable<any[]> => {

    if (keyword) {
      this.queryStructHobbieAuto.suggest.hobbies.prefix = keyword;
      return this.elasticsearchService.executePostRequest(this.queryStructHobbieAuto).map(r =>{
        if(r.suggest.hobbies[0].length > 0){
          return Array.from(new Set(r.suggest.hobbies[0].options.map(opt => opt.text)));
        }
      });
    } else {
      return Observable.of([]);
    }
  }

  onHobbyChangeNormal(choice) {
    this.httpClient.get('assets/users_hobbie').subscribe((value:any)=> {
      value.query.match["hobbies.folded_lowercase"] = choice;
      this.elasticsearchService.executePostRequest(value).subscribe(r =>{
        this.resultHobbies = r;
      });
    });
  }

  onHobbyChangeFuzzy(choice) {
    this.httpClient.get('assets/users_hobbie_mode_fuzzy').subscribe((value:any)=> {
      value.query.fuzzy.hobbies.value = choice;
      value.query.fuzzy.hobbies.fuzziness = this.hobbieFuzzy;
      this.elasticsearchService.executePostRequest(value).subscribe(r =>{
        this.resultHobbies = r;
      });
    });
  }


  onHobbyChangeAutocomplete(choice) {
    this.onHobbyChangeNormal(choice)
  }

  hobbieChangeMode($event) {
    this.hobbieText = "";
    this.hobbieFuzzy = 2;
    this.resultHobbies = null;
  }

  onHobbyChangeFuzzyOptFuziness(optFuz) {
    this.httpClient.get('assets/users_hobbie_mode_fuzzy').subscribe((value:any)=> {
      value.query.fuzzy.hobbies.value = this.hobbieText;
      value.query.fuzzy.hobbies.fuzziness = optFuz;

      this.elasticsearchService.executePostRequest(value).subscribe(r =>{
        this.resultHobbies = r;
      });
    });
  }
}
