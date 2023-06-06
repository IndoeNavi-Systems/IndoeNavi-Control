import { RouteNode } from "./route-node";
import { SPE } from "./spe";

export class IndoorMap{
  id? : any;
  area : string;
  imageData : string;
  routeNodes : RouteNode[] = [];
  spes : SPE[] = [];
  meterPerPixel : number = 1;

  public constructor(id : any, area : string, imageData : string, routeNodes : RouteNode[], spes : SPE[]){
    this.id = id;
    this.area = area;
    this.imageData = imageData;
    this.routeNodes = routeNodes;
    this.spes = spes;
  }

  public getSPE(x : number, y : number) : SPE | null {
    for (let i = 0; i < this.spes.length; i++){
      if (this.distanceToSPE(this.spes[i], x, y) < 32){
        return this.spes[i];
      }
    }
    return null;
  }

  public deleteSPE(spe : SPE){
    for (let i = 0; i < this.spes.length; i++){
      if (this.spes[i] == spe){
        this.spes.splice(i, 1);
        return;
      }
    }
  }

  public distanceToSPE(spe : SPE, x : number, y : number) : number{
    return Math.sqrt(Math.abs((x - spe.x)**2 + (y - spe.y)**2));
  }
}
