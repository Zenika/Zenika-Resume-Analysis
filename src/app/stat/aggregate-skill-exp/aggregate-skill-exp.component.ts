import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ElasticsearchService} from "../../common/elasticsearch/ElasticsearchService";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-aggregate-skill-exp',
  templateUrl: './aggregate-skill-exp.component.html',
  styleUrls: ['./aggregate-skill-exp.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AggregateSkillExpComponent implements OnInit {

  resultRepartMetier: any;

  constructor(private elasticsearchService: ElasticsearchService, private httpClient: HttpClient) {
  }

  ngOnInit() {

    this.httpClient.get('assets/users_skills_stat').subscribe((value: any) => {
      this.elasticsearchService.executePostRequest(value).subscribe(r => {
        this.resultRepartMetier = r;
      });
    });

  }
}
