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

  public getSPE(x : number, y : number) : SPE | null {
    for (let i = 0; i < this.spes.length; i++){
      if (this.spes[i].distanceToPoint(x, y) < 8){
        return this.spes[i];
      }
    }
    return null;
  }

  public deleteSPE(id : number){
    for (let i = 0; i < this.spes.length; i++){
      if (this.spes[i].id == id){
        this.spes.splice(i, 1);
        return;
      }
    }
  }
}
