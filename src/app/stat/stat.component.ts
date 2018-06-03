import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ElasticsearchService} from "../common/elasticsearch/ElasticsearchService";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatComponent implements OnInit {


  resultSearchCriterias: any;

  maxRangeNbAnneeExp: number;
  minRangeNbAnneeExp: number;
  complexCriteriaMinRangeNbAnneeExpSelected: number;
  complexCriteriaMaxRangeNbAnneeExpSelected: number;
  complexCriteriaFieldNbAnneeExpOp: string;
  complexCriteriaGlobalSkillsSelected:string;
  complexCriteriaDescSelected:string;

  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  // Initialized to specific date (09.10.2018).
  dateChoiceMission: any = { date: null };

  criteriaOperations = [
    "must",
    "must_not",
    "filter",
    "should"
    ];

  constructor(private elasticsearchService : ElasticsearchService, private httpClient: HttpClient) { }

  ngOnInit() {


    this.httpClient.get('assets/find_all_nbanneeExp').subscribe((value:any)=> {
      this.elasticsearchService.executePostRequest(value, 'formation-elastic-alias/doc/_search').subscribe(r =>{
        this.maxRangeNbAnneeExp = Math.max(...r.aggregations.exp.buckets.map(b=>b.key));
        this.minRangeNbAnneeExp = Math.min(...r.aggregations.exp.buckets.map(b=>b.key));
      });
    });
  }


  complexCriteriaGlobalSkillsOp: string;
  complexCriteriaCustomerName: string;
  complexCriteriaDescOp: string;
  whoWorkCustomerVal: string;
  complexCriteriaWorkingDate: string;
  requestSearchCriterias: any;
  currentNumberPage:number = 1;
  totalNumberByPage: number = 10;




  nbAnneeExpRangeChange($event: any) {
    this.complexCriteriaMinRangeNbAnneeExpSelected = $event.startValue;
    this.complexCriteriaMaxRangeNbAnneeExpSelected = $event.endValue;
  }

  searchCriterias() {
    this.httpClient.get('assets/complexCriteria').subscribe((value:any)=> {
      console.log("criteria req befor modif ",value);

      //define pagination from
      value.from = (this.currentNumberPage-1)*this.totalNumberByPage;

      let rangeBlock = {
        range:{
          nbAnneeExp : {gte : {},lt: {}},
        }
      };
      let termBlock = {
        term:{
          globalSkills : null,
        }
      };
      let matchBlockDescMissionDesc = {
        match:{
          "missions.description" : null
          },
        };

      let matchBlockCustomerMission= {
        match:{
          "missions.location" : null
        },
      };

      let rangeStartDateMission = null;
      let rangeEndDateMission = null;

      if(this.dateChoiceMission && this.dateChoiceMission.date) {
        rangeStartDateMission = {
          range: {
            "missions.startDate": {lte: this.createFormattedDate(this.dateChoiceMission.date)},
          },
        };
        rangeEndDateMission = {
          range: {
            "missions.endDate": {gte: this.createFormattedDate(this.dateChoiceMission.date)},
          },
        };

        if(this.complexCriteriaWorkingDate == "must"){
          value.query.bool.must[0].nested.query.bool.must.push(rangeStartDateMission,rangeEndDateMission);
        }
        else if(this.complexCriteriaWorkingDate == "filter"){
          value.query.bool.must[0].nested.query.bool.filter.push(rangeStartDateMission,rangeEndDateMission);
        }
        else if(this.complexCriteriaWorkingDate == "should"){
          value.query.bool.must[0].nested.query.bool.should.push(rangeStartDateMission,rangeEndDateMission);
        }
        else if(this.complexCriteriaWorkingDate == "must_not"){
          value.query.bool.must[0].nested.query.bool.must_not.push(rangeStartDateMission,rangeEndDateMission);
        }
      }

      rangeBlock.range.nbAnneeExp.gte = this.complexCriteriaMinRangeNbAnneeExpSelected;
      rangeBlock.range.nbAnneeExp.lt = this.complexCriteriaMaxRangeNbAnneeExpSelected;

      termBlock.term.globalSkills = this.complexCriteriaGlobalSkillsSelected;
      matchBlockDescMissionDesc.match["missions.description"] = this.complexCriteriaDescSelected;
      matchBlockCustomerMission.match["missions.location"] = this.whoWorkCustomerVal;


      let mustClauses = [];
      let filterClauses = [];
      let shouldClauses = [];
      let mustNotClauses = [];

      let searchOpClauses = {
        must: {},
        filter: {},
        should: {},
        must_not: {}
      }


      if(this.complexCriteriaDescOp == "must"){
        value.query.bool.must[0].nested.query.bool.must.push(matchBlockDescMissionDesc);
      }
      else if(this.complexCriteriaDescOp == "filter"){
        value.query.bool.must[0].nested.query.bool.filter.push(matchBlockDescMissionDesc);
      }
      else if(this.complexCriteriaDescOp == "should"){
        value.query.bool.must[0].nested.query.bool.should.push(matchBlockDescMissionDesc);
      }
      else if(this.complexCriteriaDescOp == "must_not"){
        value.query.bool.must[0].nested.query.bool.must_not.push(matchBlockDescMissionDesc);
      }

      if(this.complexCriteriaCustomerName == "must"){
        value.query.bool.must[0].nested.query.bool.must.push(matchBlockCustomerMission);
      }
      else if(this.complexCriteriaCustomerName == "filter"){
        value.query.bool.must[0].nested.query.bool.filter.push(matchBlockCustomerMission);
      }
      else if(this.complexCriteriaCustomerName == "should"){
        value.query.bool.must[0].nested.query.bool.should.push(matchBlockCustomerMission);
      }
      else if(this.complexCriteriaCustomerName == "must_not"){
        value.query.bool.must[0].nested.query.bool.must_not.push(matchBlockCustomerMission);
      }

      if(this.complexCriteriaGlobalSkillsOp == "must"){
        value.query.bool.must.push(termBlock);
      }
      else if(this.complexCriteriaGlobalSkillsOp == "filter"){
        filterClauses.push(termBlock);
      }
      else if(this.complexCriteriaGlobalSkillsOp == "should"){
        shouldClauses.push(termBlock);
      }
      else if(this.complexCriteriaGlobalSkillsOp == "must_not"){
        mustNotClauses.push(termBlock);
      }

      if(this.complexCriteriaFieldNbAnneeExpOp == "must"){
        value.query.bool.must.push(rangeBlock);
      }
      else if(this.complexCriteriaFieldNbAnneeExpOp == "filter"){
        filterClauses.push(rangeBlock);
      }
      else if(this.complexCriteriaFieldNbAnneeExpOp == "should"){
        shouldClauses.push(rangeBlock);
      }
      else if(this.complexCriteriaFieldNbAnneeExpOp == "must_not"){
        mustNotClauses.push(rangeBlock);
      }


      //searchOpClauses.must = value.query.bool;
      searchOpClauses.filter = filterClauses;
      searchOpClauses.should = shouldClauses;
      searchOpClauses.must_not = mustNotClauses;

      //value.query.bool = searchOpClauses;
      value.query.bool.filter = filterClauses;
      value.query.bool.should = shouldClauses;
      value.query.bool.must_not = mustNotClauses;

      this.requestSearchCriterias = value;

      console.log("criteria req after modif ",value);
      this.elasticsearchService.executePostRequest(value, 'formation-elastic-alias/doc/_search').subscribe(r =>{
        this.resultSearchCriterias = r;
      });
    });
  }

  createFormattedDate(date) :string {
    console.log("date ",date);

    return date.year+"-"+('0' + (date.month+1)).slice(-2)+"-"+('0' + date.day).slice(-2);
  }

  onComplexCriteriaGlobalSkillsChange(value){
    this.complexCriteriaGlobalSkillsSelected = value;
  }

  onComplexCriteriaMissionDescChange(value) {
    this.complexCriteriaDescSelected = value;
  }


  pageChanged($event: number) {
    this.searchCriterias();
    this.currentNumberPage =  $event;
  }

}
