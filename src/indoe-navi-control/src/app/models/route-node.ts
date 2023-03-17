export interface RouteNode{
  x : number
  y : number
  isDestination : boolean,
  routeNodes : RouteNode[],
  name : string[]
}
