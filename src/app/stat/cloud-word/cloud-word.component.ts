import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ElasticsearchService} from "../../common/elasticsearch/ElasticsearchService";
import {HttpClient} from "@angular/common/http";
import {AgWordCloudData, AgWordCloudDirective} from "angular4-word-cloud";

@Component({
  selector: 'app-cloud-word',
  templateUrl: './cloud-word.component.html',
  styleUrls: ['./cloud-word.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CloudWordComponent implements OnInit {

  results : any;

  @ViewChild('word_cloud_chart') chart: AgWordCloudDirective;


   wordData: Array<AgWordCloudData> = [];

  options = {
      settings: {
        minFontSize: 10,
        maxFontSize: 100,
      },
      margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
      labels: true // false to hide hover labels
    };

  constructor(private elasticsearchService : ElasticsearchService, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onAllFieldsChange(valueFill) {
    this.httpClient.get('assets/cloud_word_skills').subscribe((value:any)=> {
      value.query.terms["globalSkills.folded_lowercase"] = [valueFill];
      this.elasticsearchService.executePostRequest(value, 'formation-elastic-alias/doc/_search').subscribe(r =>{
        this.results = r;
        if(this.results){
          this.wordData = this.results.aggregations.significant_skills.buckets.map(v=>{
            return {text:v.key,size:v.score};
          });

        }
        setTimeout(()=>{
          this.chart.update();
        },400)
       });
    });

  }

}
