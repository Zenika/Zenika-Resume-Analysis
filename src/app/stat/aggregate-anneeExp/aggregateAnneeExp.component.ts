import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ElasticsearchService} from "../../common/elasticsearch/ElasticsearchService";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-aggregate-annee-exp',
  templateUrl: './aggregateAnneeExp.component.html',
  styleUrls: ['./aggregateAnneeExp.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AggregateAnneeExpComponent implements OnInit {

  expanded: boolean = false;

  resultHistoRepartNbAnneeExp: any;

  constructor(private elasticsearchService : ElasticsearchService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('assets/users_histo_repart_nbAnneeExp.json').subscribe((value:any)=> {
      this.elasticsearchService.executePostRequest(value).subscribe(r =>{
        this.resultHistoRepartNbAnneeExp = r;
      });
    });
  }

}
