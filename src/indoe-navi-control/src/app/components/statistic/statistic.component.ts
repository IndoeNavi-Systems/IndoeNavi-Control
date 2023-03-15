import { Component, OnInit  } from '@angular/core';
import { BlockChart } from 'src/app/models/charts/block-chart';
import { Chart } from 'src/app/models/charts/chart';
import { ListChart } from 'src/app/models/charts/list-chart';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit  {
  charts: Chart[] = [];

  ngOnInit(): void {
    this.charts = [
      new BlockChart("Vejfindings sessioner", [ { label: "8/3", value: 32 }, { label: "9/3", value: 64 }, { label: "10/3", value: 128 } ]),
      new ListChart("Mindst bruge sensorer", { headers: [ "id", "Sidst brugt" ], rows: [{ values: ["1", "8/3"] }, {values: ["2", "9/3"]}] }),
      new BlockChart("Aktive brugere", [ { label: "8/3", value: 48 }, { label: "9/3", value: 96 }, { label: "10/3", value: 144 } ]),
      new ListChart("Mest søgte destinationer", { headers: [ "Navn", "Antal søgt" ], rows: [{ values: ["D.30", "420"] }, {values: ["420", "123"]}] }),
    ];
  }
}
