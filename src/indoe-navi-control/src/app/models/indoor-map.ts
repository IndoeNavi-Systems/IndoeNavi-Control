import { RouteNode } from "./route-node";
import { SPE } from "./spe";

export interface IndoorMap{
  area : string,
  imageData : string,
  routeNodes : RouteNode[],
  spes : SPE[],
}
