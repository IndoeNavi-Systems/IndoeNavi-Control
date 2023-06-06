import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndoorMap } from '../models/indoor-map';
import { SPE } from '../models/spe';
import { RouteNode } from '../models/route-node';
import { PathSession } from '../models/statistics/pathsession';
import { ActiveUser } from '../models/statistics/activeuser';
import { DestinationVisit } from '../models/statistics/destinationvisit';
import { UsedSensor } from '../models/statistics/usedsensor';

@Injectable({
  providedIn: 'root'
})
export class IndoeNaviAPIService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = "https://indoenavi.api.viften.elkok.dk";

  getMap() : Observable<IndoorMap>{
    return this.http.get<IndoorMap>(this.baseUrl + "/Map?area=ZBC-Ringsted");
  }

  updateMap(map : IndoorMap) : Observable<IndoorMap>{
    return this.http.put<IndoorMap>(this.baseUrl + "/Map", map);
  }

  // Statistics endpoints 
  getPathSessions() : Observable<PathSession[]>{
    return this.http.get<PathSession[]>(this.baseUrl + "/Statistic/pathsessions")
  }
  
  getActiveUsers() : Observable<ActiveUser[]>{
    return this.http.get<ActiveUser[]>(this.baseUrl + "/Statistic/activeusers")
  }

  getDestinationVisits() : Observable<DestinationVisit[]>{
    return this.http.get<DestinationVisit[]>(this.baseUrl + "/Statistic/destinationvisits")
  }

  getUsedSensors() : Observable<UsedSensor[]>{
    return this.http.get<UsedSensor[]>(this.baseUrl + "/Statistic/usedsensor")
  }
}
