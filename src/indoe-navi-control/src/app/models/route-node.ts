var idIndex = 0;

export class RouteNode{
  id : number;
  x : number;
  y : number;
  isDestination : boolean;
  routeNodes : RouteNode[];
  name : string[];

  public constructor(x : number, y : number, isDestination : boolean, routeNodes : RouteNode[], name : string[]){
    this.id = idIndex++;
    this.x = x;
    this.y = y;
    this.isDestination = isDestination;
    this.routeNodes = routeNodes;
    this.name = name;
  }

  public distanceToPoint(x : number, y : number) : number{
    return Math.sqrt(Math.abs((x - this.x)**2 + (y - this.y)**2));
  }
}
