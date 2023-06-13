import { Component, OnInit  } from '@angular/core';
import { BlockChart } from 'src/app/models/block-chart';
import { Chart } from 'src/app/models/chart';
import { ListChart } from 'src/app/models/list-chart';
import { DateValue } from 'src/app/models/date-value';
import { NameValue } from 'src/app/models/name-value';
import { IndoeNaviAPIService } from 'src/app/services/indoe-navi-api.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit  {
  charts: Chart[] = [];
  constructor(public indoeNaviAPIService : IndoeNaviAPIService) {}

  ngOnInit(): void {
    this.charts = [
      new BlockChart("Vejfindings sessioner", []),
      new ListChart("Mindst brugte sensorer", { headers: [ "Navn", "Sidst brugt" ], rows: [] }),
      new BlockChart("Aktive brugere", []),
      new ListChart("Mest søgte destinationer", { headers: [ "Navn", "Antal søgt" ], rows: [] }),
    ];

    // Active Users
    this.indoeNaviAPIService.getActiveUsers().subscribe((data: DateValue[]) => {
      data.forEach(a => {
        (<BlockChart>this.charts[2]).addDateValue(a);
      });
    });
    // Path sessions
    this.indoeNaviAPIService.getPathSessions().subscribe((data: DateValue[]) => {
      data.forEach(ps => {
        (<BlockChart>this.charts[0]).addDateValue(ps);
      });
    });
    // Destination visits
    this.indoeNaviAPIService.getDestinationVisits().subscribe((data: NameValue[]) => {
      data.forEach(dv => {
        (<ListChart>this.charts[3]).addNameValue(dv);
      });
    });
    // Used sensors
    this.indoeNaviAPIService.getUsedSensors().subscribe((data: NameValue[]) => {
      data.forEach(us => {
        (<ListChart>this.charts[1]).addNameValue(us);
      });
    });
  }
}
