import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ElasticsearchService} from "../../common/elasticsearch/ElasticsearchService";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-global-search-unstructured',
  templateUrl: './global-search-unstructured.component.html',
  styleUrls: ['./global-search-unstructured.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalSearchUnstructuredComponent implements OnInit {

  expanded: boolean = false;

  resultAllFields : any;


  constructor(private elasticsearchService : ElasticsearchService, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onAllFieldsChange(valueFill) {
    this.httpClient.get('assets/users_search_unstructured_field').subscribe((value:any)=> {
      value.query.match.fullContent = valueFill;
      this.elasticsearchService.executePostRequest(value).subscribe(r =>{
        this.resultAllFields = r;
      });
    });
  }

}
