import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndoorMap } from '../models/indoor-map';
import { SPE } from '../models/spe';
import { RouteNode } from '../models/route-node';

@Injectable({
  providedIn: 'root'
})
export class IndoeNaviAPIService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = "https://indoenavi.api.viften.elkok.dk/";

  getMap() : Observable<IndoorMap>{
    return this.http.get<IndoorMap>(this.baseUrl + "/map");
  }

  importMap(imageData : string) : Observable<IndoorMap>{
    return this.http.put<IndoorMap>(this.baseUrl + "/import/", imageData);
  }

  updateRouteNodes(routeNodes : RouteNode[]) : Observable<IndoorMap>{
    return this.http.put<IndoorMap>(this.baseUrl + "/nodes/", routeNodes);
  }

  updateSPEs(spes : SPE[]) : Observable<IndoorMap>{
    return this.http.put<IndoorMap>(this.baseUrl + "/spes/", spes);
  }
}
