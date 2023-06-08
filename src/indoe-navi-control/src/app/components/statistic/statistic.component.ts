import { Component, OnInit  } from '@angular/core';
import { BlockChart } from 'src/app/models/charts/block-chart';
import { Chart } from 'src/app/models/charts/chart';
import { ListChart } from 'src/app/models/charts/list-chart';
import { ActiveUser } from 'src/app/models/statistics/activeuser';
import { DestinationVisit } from 'src/app/models/statistics/destinationvisit';
import { PathSession } from 'src/app/models/statistics/pathsession';
import { UsedSensor } from 'src/app/models/statistics/usedsensor';
import { StatisticsHandlerService } from 'src/app/services/statistics-handler.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit  {
  charts: Chart[] = [];
  constructor(public statisticHandler: StatisticsHandlerService) {}

  ngOnInit(): void {
    this.charts = [
      new BlockChart("Vejfindings sessioner", []),
      new ListChart("Mindst bruge sensorer", { headers: [ "id", "Sidst brugt" ], rows: [] }),
      new BlockChart("Aktive brugere", []),
      new ListChart("Mest søgte destinationer", { headers: [ "Navn", "Antal søgt" ], rows: [] }),
    ];

    // Active Users
    this.statisticHandler.loadActiveUsers().subscribe((data: ActiveUser[]) => {
      next:
        data.forEach(a => {
          (<BlockChart>this.charts[2]).values.push({label: (new Date(a.date)).toLocaleDateString(), value: a.count})
        });

    });
    // Path sessions
    this.statisticHandler.loadPathSessions().subscribe((data: PathSession[]) => {
      next:
        data.forEach(ps => {
          (<BlockChart>this.charts[0]).values.push({label: (new Date(ps.date)).toLocaleDateString(), value: ps.count})
        });

    });
    // Destination visits
    this.statisticHandler.loadDestVisits().subscribe((data: DestinationVisit[]) => {
      next:
        data.forEach(dv => {
          (<ListChart>this.charts[3]).table.rows.push({values: [dv.destination, dv.count.toString()]})
        });

    });
    // Used sensors
    this.statisticHandler.loadUsedSensors().subscribe((data: UsedSensor[]) => {
      next:
        data.forEach(us => {
          (<ListChart>this.charts[1]).table.rows.push({values: [us.sensorName, us.count.toString()]})
        });

    });
  }
}
