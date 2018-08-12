import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ElasticsearchService} from "../../common/elasticsearch/ElasticsearchService";
import {HttpClient} from "@angular/common/http";
import {IMyDpOptions} from "mydatepicker";

@Component({
  selector: 'app-search-multi-criterias',
  templateUrl: './search-multi-criterias.component.html',
  styleUrls: ['./search-multi-criterias.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchMultiCriteriasComponent implements OnInit {

  expanded: boolean = false;

  resultSearchCriterias: any;



  complexCriteriaFieldNbAnneeExpOp: string = "must";

  complexCriteriaGlobalSkillsOp: string = "must";
  complexCriteriaCustomerName: string = "must";
  complexCriteriaDescOp: string = "must";
  whoWorkCustomerVal: string;
  complexCriteriaWorkingDate: string = "must";
  requestSearchCriterias: any;
  currentNumberPage:number = 1;
  totalNumberByPage: number = 10;

  maxRangeNbAnneeExp: number;
  minRangeNbAnneeExp: number;
  complexCriteriaMinRangeNbAnneeExpSelected: number;
  complexCriteriaMaxRangeNbAnneeExpSelected: number;
  complexCriteriaGlobalSkillsSelected:string;
  complexCriteriaDescSelected:string;

  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  // Initialized to specific date (09.10.2018).
  dateChoiceMission: any = { date: null };

  // criteriaOperations = [
  //   "must",
  //   "must_not",
  //   "filter",
  //   "should"
  // ];

  criteriaOperations = [
    {key : "must", text:"contient"},
    {key : "must_not", text:"ne contient pas"}
  ];


  criteriaOperationsWithExactSearch = [
    {key : "must", text:"contient"},
    {key : "must_not", text:"ne contient pas"},
    {key : "searchExact", text:"recherche exacte"}
  ];




  constructor(private elasticsearchService : ElasticsearchService, private httpClient: HttpClient) { }

  ngOnInit() {


    this.httpClient.get('assets/find_all_nbanneeExp').subscribe((value:any)=> {
      this.elasticsearchService.executePostRequest(value).subscribe(r =>{
        this.maxRangeNbAnneeExp = Math.max(...r.aggregations.exp.buckets.map(b=>b.key));
        this.minRangeNbAnneeExp = Math.min(...r.aggregations.exp.buckets.map(b=>b.key));
      });
    });
  }



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

      let skillBlock;

      if(this.complexCriteriaGlobalSkillsOp == "searchExact"){
        skillBlock = {
          term:{
            'globalSkills.keyword' :  this.complexCriteriaGlobalSkillsSelected,
          }
        };
      }else{
        skillBlock = {
          match:{
            globalSkills :  this.complexCriteriaGlobalSkillsSelected,
          }
        };
      }

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

        if(this.complexCriteriaWorkingDate == "must" && this.dateChoiceMission != undefined && this.dateChoiceMission != ""){
          value.query.bool.must[0].nested.query.bool.must.push(rangeStartDateMission,rangeEndDateMission);
        }
        else if(this.complexCriteriaWorkingDate == "filter" && this.dateChoiceMission != undefined && this.dateChoiceMission != ""){
          value.query.bool.must[0].nested.query.bool.filter.push(rangeStartDateMission,rangeEndDateMission);
        }
        else if(this.complexCriteriaWorkingDate == "should" && this.dateChoiceMission != undefined && this.dateChoiceMission != ""){
          value.query.bool.must[0].nested.query.bool.should.push(rangeStartDateMission,rangeEndDateMission);
        }
        else if(this.complexCriteriaWorkingDate == "must_not" && this.dateChoiceMission != undefined && this.dateChoiceMission != ""){
          value.query.bool.must[0].nested.query.bool.must_not.push(rangeStartDateMission,rangeEndDateMission);
        }
      }

      rangeBlock.range.nbAnneeExp.gte = this.complexCriteriaMinRangeNbAnneeExpSelected;
      rangeBlock.range.nbAnneeExp.lt = this.complexCriteriaMaxRangeNbAnneeExpSelected;

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


      if(this.complexCriteriaDescOp == "must" && this.complexCriteriaDescSelected != undefined && this.complexCriteriaDescSelected != ""){
        value.query.bool.must[0].nested.query.bool.must.push(matchBlockDescMissionDesc);
      }
      else if(this.complexCriteriaDescOp == "filter" && this.complexCriteriaDescSelected != undefined && this.complexCriteriaDescSelected != ""){
        value.query.bool.must[0].nested.query.bool.filter.push(matchBlockDescMissionDesc);
      }
      else if(this.complexCriteriaDescOp == "should" && this.complexCriteriaDescSelected != undefined && this.complexCriteriaDescSelected != ""){
        value.query.bool.must[0].nested.query.bool.should.push(matchBlockDescMissionDesc);
      }
      else if(this.complexCriteriaDescOp == "must_not" && this.complexCriteriaDescSelected != undefined && this.complexCriteriaDescSelected != ""){
        value.query.bool.must[0].nested.query.bool.must_not.push(matchBlockDescMissionDesc);
      }

      if(this.complexCriteriaCustomerName == "must" && this.whoWorkCustomerVal != undefined && this.whoWorkCustomerVal != ""){
        value.query.bool.must[0].nested.query.bool.must.push(matchBlockCustomerMission);
      }
      else if(this.complexCriteriaCustomerName == "filter" && this.whoWorkCustomerVal != undefined && this.whoWorkCustomerVal != ""){
        value.query.bool.must[0].nested.query.bool.filter.push(matchBlockCustomerMission);
      }
      else if(this.complexCriteriaCustomerName == "should" && this.whoWorkCustomerVal != undefined && this.whoWorkCustomerVal != ""){
        value.query.bool.must[0].nested.query.bool.should.push(matchBlockCustomerMission);
      }
      else if(this.complexCriteriaCustomerName == "must_not" && this.whoWorkCustomerVal != undefined  && this.whoWorkCustomerVal != ""){
        value.query.bool.must[0].nested.query.bool.must_not.push(matchBlockCustomerMission);
      }


      if((this.complexCriteriaGlobalSkillsOp == "must" || this.complexCriteriaGlobalSkillsOp == "searchExact") && this.complexCriteriaGlobalSkillsSelected != undefined && this.complexCriteriaGlobalSkillsSelected != ""){
        value.query.bool.must.push(skillBlock);
      }
      else if(this.complexCriteriaGlobalSkillsOp == "filter"  && this.complexCriteriaGlobalSkillsSelected != undefined && this.complexCriteriaGlobalSkillsSelected != ""){
        filterClauses.push(skillBlock);
      }
      else if(this.complexCriteriaGlobalSkillsOp == "should"  && this.complexCriteriaGlobalSkillsSelected != undefined && this.complexCriteriaGlobalSkillsSelected != ""){
        shouldClauses.push(skillBlock);
      }
      else if(this.complexCriteriaGlobalSkillsOp == "must_not" && this.complexCriteriaGlobalSkillsSelected != undefined && this.complexCriteriaGlobalSkillsSelected != ""){
        mustNotClauses.push(skillBlock);
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
      this.elasticsearchService.executePostRequest(value).subscribe(r =>{
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
