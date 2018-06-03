import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ElasticsearchService} from "../../common/elasticsearch/ElasticsearchService";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserSearchComponent implements OnInit {

  resultFullname : any;

  constructor(private elasticsearchService : ElasticsearchService, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onFullnameChange(valueFill) {
    this.httpClient.get('assets/users_fullname_phrase').subscribe((value:any)=> {
      value.query.match_phrase.fullname = valueFill;
      this.elasticsearchService.executePostRequest(value, 'formation-elastic-alias/doc/_search').subscribe(r =>{
        this.resultFullname = r;
      });
    });
  }



}
