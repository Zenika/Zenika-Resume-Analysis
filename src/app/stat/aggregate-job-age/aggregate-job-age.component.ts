import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ElasticsearchService} from "../../common/elasticsearch/ElasticsearchService";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-aggregate-job-age',
  templateUrl: './aggregate-job-age.component.html',
  styleUrls: ['./aggregate-job-age.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AggregateJobAgeComponent implements OnInit {

  expanded: boolean = false;
  resultRepartMetier: any;


  constructor(private elasticsearchService : ElasticsearchService, private httpClient: HttpClient) { }

  ngOnInit() {

    this.httpClient.get('assets/users_repartition_metier_et_moy_age').subscribe((value:any)=> {
      this.elasticsearchService.executePostRequest(value).subscribe(r =>{
        this.resultRepartMetier = r;
      });
    });


  }

}
