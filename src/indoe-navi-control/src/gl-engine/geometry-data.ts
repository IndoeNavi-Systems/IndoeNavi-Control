import { vec2 } from "gl-matrix";
import { Geometry } from "./geometry";

export class Line extends Geometry {
  a : vec2;
  b : vec2;

  constructor(a : vec2, b : vec2){
    super();
    this.a = a;
    this.b = b;
  }

  override generateVertices() : void{
    this.updateVerticesData(2);
		this.verticesData.addVec2(this.a);
		this.verticesData.addVec2(this.b);
  }
}
