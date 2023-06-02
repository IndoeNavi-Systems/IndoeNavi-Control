import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActiveUser } from '../models/statistics/activeuser';
import { IndoeNaviAPIService } from './indoe-navi-api.service';
import { PathSession } from '../models/statistics/pathsession';
import { DestinationVisit } from '../models/statistics/destinationvisit';
import { UsedSensor } from '../models/statistics/usedsensor';

@Injectable({
  providedIn: 'root'
})
export class StatisticsHandlerService {
  constructor(private indoeNaviApi: IndoeNaviAPIService) { }
  activeuser$ = new BehaviorSubject<ActiveUser[]>([]);
  usedSensors$ = new BehaviorSubject<UsedSensor[]>([]);
  destVisits$ = new BehaviorSubject<DestinationVisit[]>([]);
  pathSessions$ = new BehaviorSubject<PathSession[]>([]);



  loadActiveUsers() : BehaviorSubject<ActiveUser[]> {
    this.indoeNaviApi.getActiveUsers().subscribe((data : ActiveUser[]) => {
        this.activeuser$.next(data);
    });
    return this.activeuser$;
  }

  loadUsedSensors() : BehaviorSubject<UsedSensor[]> {
    this.indoeNaviApi.getUsedSensors().subscribe((data : UsedSensor[]) => {
        this.usedSensors$.next(data);
    });
    return this.usedSensors$;
  }

  loadDestVisits() : BehaviorSubject<DestinationVisit[]> {
    this.indoeNaviApi.getDestinationVisits().subscribe((data : DestinationVisit[]) => {
        this.destVisits$.next(data);
    });
    return this.destVisits$;
  }

  loadPathSessions() : BehaviorSubject<PathSession[]> {
    this.indoeNaviApi.getPathSessions().subscribe((data : PathSession[]) => {
        this.pathSessions$.next(data);
    });
    return this.pathSessions$;
  }
}
