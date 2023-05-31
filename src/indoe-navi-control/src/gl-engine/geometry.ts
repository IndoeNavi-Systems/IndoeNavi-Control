import { number } from "echarts";
import {vec2 } from "gl-matrix";

export class VerticesData{
  valuesIndex : number = 0;
  valueAmount : number = 0;
  values : number[] = [];
  vertexSize : number = 0;
  vertexAmount : number = 0;
  vertexDefinition : number[] = [];

  addVec2(vec : vec2){
    this.addNumber(vec[0]);
    this.addNumber(vec[1]);
  }

  addNumber(value : number)
  {
    if (this.valuesIndex > this.valueAmount)
    {
      console.error("Geometry heap error, incorrect reserve value");
    }
    this.values[this.valuesIndex] = value;
    this.valuesIndex++;
  }
}

export class Geometry{
  VBO : WebGLBuffer | null = null;
  VAO : WebGLVertexArrayObject | null = null;
  verticesData : VerticesData = new VerticesData();
  isVerticesDataCreated : boolean = false;

  updateVerticesData(vertexAmount : number){
    this.VBO = null;
		this.VAO = null;
    this.verticesData.values = [];
    this.verticesData.vertexSize = 8;
    this.verticesData.vertexDefinition = [2];
    this.verticesData.valueAmount = vertexAmount * this.verticesData.vertexSize;
    this.verticesData.vertexAmount = vertexAmount;
    this.isVerticesDataCreated = true;
  }

  generateVertices() : void {
  }
}
