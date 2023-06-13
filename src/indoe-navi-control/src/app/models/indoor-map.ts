import { RouteNode } from "./route-node";
import { SPE } from "./spe";

export class IndoorMap{
  public id? : any;
  public area : string;
  public imageData : string;
  public routeNodes : RouteNode[] = [];
  public spes : SPE[] = [];
  public meterPerPixel : number = 1;

  public constructor(id : any, area : string, imageData : string, routeNodes : RouteNode[], spes : SPE[], meterPerPixel : number){
    this.id = id;
    this.area = area;
    this.imageData = imageData;
    this.routeNodes = routeNodes;
    this.spes = spes;
    this.meterPerPixel = meterPerPixel;
  }

  public findSPEByPosition(x : number, y : number) : SPE | null {
    for (let i = 0; i < this.spes.length; i++){
      if (this.calculateDistanceToSPE(this.spes[i], x, y) < 32){
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

  public calculateDistanceToSPE(spe : SPE, x : number, y : number) : number{
    return Math.sqrt(Math.abs((x - spe.x)**2 + (y - spe.y)**2));
  }
}
