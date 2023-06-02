export class RouteNode{
  x : number;
  y : number;
  isDestination : boolean;
  routeNodes : RouteNode[];
  name : string[];

  public constructor(x : number, y : number, isDestination : boolean, routeNodes : RouteNode[], name : string[]){
    this.x = x;
    this.y = y;
    this.isDestination = isDestination;
    this.routeNodes = routeNodes;
    this.name = name;
  }
}
