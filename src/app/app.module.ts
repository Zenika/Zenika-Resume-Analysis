import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StatComponent } from './stat/stat.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ElasticsearchService} from "./common/elasticsearch/ElasticsearchService";
import {NguiAutoCompleteModule} from "@ngui/auto-complete";
import {D3Service} from "d3-ng2-service";
import {StatHistoNbAnneeExpComponent} from "./stat/stat-histo-nb-annee-exp/stat-histo-nb-annee-exp.component";
import {D3SliderDirective} from "./common/slide/d3-slider.directive";
import {Ng2SliderComponent} from "./common/ng2slide/ng2slide.component";
import {SlideAbleDirective} from "ng2-slideable-directive/slideable.directive";
import {Ng2StyledDirective} from "ng2-styled-directive/ng2-styled.directive";
import {MyDatePickerModule} from "mydatepicker";
import {NgxPaginationModule} from "ngx-pagination";
import { PartTimeActivityComponent } from './stat/part-time-activity/part-time-activity.component';
import { GlobalSearchComponent } from './stat/global-search/global-search.component';
import { UserSearchComponent } from './stat/user-search/user-search.component';
import {AggregateAnneeExpComponent} from "./stat/aggregate-anneeExp/aggregateAnneeExp.component";
import { AggregateJobAgeComponent } from './stat/aggregate-job-age/aggregate-job-age.component';
import { SearchMultiCriteriasComponent } from './stat/search-multi-criterias/search-multi-criterias.component';
import { AdminImportComponent } from './stat/administration/admin-import/admin-import.component';
import {ImportUserService} from "./common/import/user/ImportUserService";
import { AggregateSkillExpComponent } from './stat/aggregate-skill-exp/aggregate-skill-exp.component';
import { GlobalSearchUnstructuredComponent } from './stat/global-search-unstructured/global-search-unstructured.component';
import { CloudWordComponent } from './stat/cloud-word/cloud-word.component';
import {AgWordCloudModule} from "angular4-word-cloud";
import { environment } from '../environments/environment';
import {
  GoogleApiModule,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
} from "ng-gapi";
import {RouterModule, Routes} from "@angular/router";

const gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.googleApiId,
  ux_mode: "redirect",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ].join(" ")
};


const routes: Routes = [
  {path: 'part-time/hobby', component: PartTimeActivityComponent},
  {path: 'global-search', component: GlobalSearchComponent},
  {path: 'global-search-unstructured', component: GlobalSearchUnstructuredComponent},
  {path: 'user-search', component: UserSearchComponent},
  {path: 'cloud-word', component: CloudWordComponent},
  {path: 'aggregate-annee-exp', component: AggregateAnneeExpComponent},
  {path: 'aggregate-job-age', component: AggregateJobAgeComponent},
  {path: 'aggregate-skill-age', component: AggregateSkillExpComponent},
  {path: 'search-multiple-crit', component: SearchMultiCriteriasComponent},
  {path: 'admin-import', component: AdminImportComponent}
];


@NgModule({
  declarations: [
   AppComponent,
    D3SliderDirective,
    StatComponent,
    StatHistoNbAnneeExpComponent,
    Ng2SliderComponent,
    SlideAbleDirective,
    Ng2StyledDirective,
    PartTimeActivityComponent,
    GlobalSearchComponent,
    UserSearchComponent,
    AggregateAnneeExpComponent,
    AggregateJobAgeComponent,
    SearchMultiCriteriasComponent,
    AdminImportComponent,
    AggregateSkillExpComponent,
    GlobalSearchUnstructuredComponent,
    CloudWordComponent]
  ,
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AgWordCloudModule.forRoot(),
    MyDatePickerModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    NguiAutoCompleteModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  providers: [ElasticsearchService,D3Service,ImportUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
