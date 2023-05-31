import { vec2 } from "gl-matrix";
import { Line } from "./geometry-data";
import { Geometry } from "./geometry";
import { number } from "echarts";

export class Renderer{
  gl : WebGL2RenderingContext;

  constructor(gl : WebGL2RenderingContext){
    this.gl = gl;
  }

  drawLine(a: vec2, b : vec2) : void {
    let line = new Line(a, b);
    this.drawGeometry(line);
  }

  drawGeometry(geometry : Geometry){
    if (!geometry.isVerticesDataCreated)
    {
      this.bind(geometry);
    }

    // Run shader

    // Draw
    this.gl.bindVertexArray(geometry.VAO);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, geometry.verticesData.vertexAmount);
    this.gl.bindVertexArray(0);
  }

	bind(geometry : Geometry)
	{
		if (!geometry.isVerticesDataCreated)
		{
			geometry.generateVertices();
		}
		if (!geometry.isVerticesDataCreated)
		{
			return;
		}
		if (geometry.VAO == null || geometry.VBO == null)
		{
      geometry.VBO = this.gl.createBuffer();
      geometry.VAO = this.gl.createVertexArray();
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, geometry.VBO);
			this.gl.bindVertexArray(geometry.VAO);
		}

		let verticesData = geometry.verticesData;

		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(verticesData.values), this.gl.STATIC_DRAW);

		let previewsVertexDefinition = 0;
		for (let i = 0; i < verticesData.vertexDefinition.length; i++)
		{
			previewsVertexDefinition += i != 0 ? verticesData.vertexDefinition[i - 1] : 0;
			this.gl.vertexAttribPointer(i, verticesData.vertexDefinition[i], this.gl.FLOAT, false, verticesData.vertexSize, previewsVertexDefinition * 4);
			this.gl.enableVertexAttribArray(i);
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, 0);
		this.gl.bindVertexArray(0);
	}
}
