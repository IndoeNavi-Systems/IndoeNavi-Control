import { RouteNode } from "./route-node";
import { SPE } from "./spe";

export class IndoorMap{
  area : string;
  imageData : string;
  routeNodes : RouteNode[];
  spes : SPE[];

  public constructor(area : string, imageData : string, routeNodes : RouteNode[], spes : SPE[]){
    this.area = area;
    this.imageData = imageData;
    this.routeNodes = routeNodes;
    this.spes = spes;
  }

  public getRouteNode(x : number, y : number) : RouteNode | null {
    for (let i = 0; i < this.routeNodes.length; i++){
      if (this.routeNodes[i].distanceToPoint(x, y) < 8){
        return this.routeNodes[i];
      }
    }
    return null;
  }

  public deleteRouteNode(id : number){
    for (let i = 0; i < this.routeNodes.length; i++){
      if (this.routeNodes[i].id == id){
        this.routeNodes.splice(i, 1);
        return;
      }
    }
  }
}
