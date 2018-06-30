import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ElasticsearchService} from "../../common/elasticsearch/ElasticsearchService";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalSearchComponent implements OnInit {

  resultAllFields : any;


  constructor(private elasticsearchService : ElasticsearchService, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onAllFieldsChange(valueFill) {
    this.httpClient.get('assets/users_all_fields').subscribe((value:any)=> {
      value.query.match._all = valueFill;
      this.elasticsearchService.executePostRequest(value).subscribe(r =>{
        this.resultAllFields = r;
      });
    });
  }

}
