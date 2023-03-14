import { RouteNode } from "./route-node";

export class IndoorMap{
  private routeNodes : RouteNode[] = [];

  constructor(){
    this.routeNodes.push({x: 0, y: 0});
    this.routeNodes.push({x: 5, y: 0});
    this.routeNodes.push({x: 10, y: 0});
  }

  getRouteNodes() : RouteNode[]{
    return this.routeNodes;
  }
}
