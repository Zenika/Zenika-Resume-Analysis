import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ImportUserService} from "../../../common/import/user/ImportUserService";

@Component({
  selector: 'app-admin-import',
  templateUrl: './admin-import.component.html',
  styleUrls: ['./admin-import.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminImportComponent implements OnInit {

  constructor(private importUserService : ImportUserService) { }

  ngOnInit() {
  }

  importAll() {
    this.importUserService.execute().subscribe(data => {

    });
  }
}
