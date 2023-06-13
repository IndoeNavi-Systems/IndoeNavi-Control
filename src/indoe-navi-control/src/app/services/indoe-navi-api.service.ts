import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndoorMap } from '../models/indoor-map';
import { DateValue } from '../models/date-value';
import { NameValue } from '../models/name-value';

@Injectable({
  providedIn: 'root'
})
export class IndoeNaviAPIService {
  private baseUrl: string = "https://indoenavi.api.viften.elkok.dk";

  constructor(private http: HttpClient) {}

  public getMap() : Observable<IndoorMap>{
    return this.http.get<IndoorMap>(this.baseUrl + "/Map?area=ZBC-Ringsted");
  }

  public updateMap(map : IndoorMap) : Observable<IndoorMap>{
    return this.http.put<IndoorMap>(this.baseUrl + "/Map", map);
  }

  public getPathSessions() : Observable<DateValue[]>{
    return this.http.get<DateValue[]>(this.baseUrl + "/Statistic/pathsessions?area=ZBC-Ringsted")
  }

  public getActiveUsers() : Observable<DateValue[]>{
    return this.http.get<DateValue[]>(this.baseUrl + "/Statistic/activeusers?area=ZBC-Ringsted")
  }

  public getDestinationVisits() : Observable<NameValue[]>{
    return this.http.get<NameValue[]>(this.baseUrl + "/Statistic/destinationvisits?area=ZBC-Ringsted")
  }

  public getUsedSensors() : Observable<NameValue[]>{
    return this.http.get<NameValue[]>(this.baseUrl + "/Statistic/usedsensor?area=ZBC-Ringsted")
  }
}
