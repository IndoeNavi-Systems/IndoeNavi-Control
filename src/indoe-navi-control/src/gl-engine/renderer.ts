import { mat4, vec2 } from "gl-matrix";
import { Line } from "./geometry-data";
import { Geometry } from "./geometry";
import { number } from "echarts";
import { GLWindow } from "./gl-window";
import { Shader } from "./shader";

export class Renderer{
	glWindow : GLWindow;
	shader : Shader;

  constructor(glWindow : GLWindow){
    this.glWindow = glWindow;

	this.shader = new Shader(glWindow, "basic2d", "attribute vec2 position;\n\nuniform mat4 model;\nuniform mat4 projection;\n\nvoid main()\n{\n    gl_Position = projection * model * vec4(position.xy, 0.0, 1.0);\n}", "varying vec4 color;\n\nuniform vec3 globalColor;\nuniform float alpha;\n\nvoid main()\n{    \n    color = vec4(globalColor, alpha);\n}  ");
	this.shader.load();
  }

  drawLine(a: vec2, b : vec2) : void {
    let line = new Line(a, b);
    this.drawGeometry(line);
  }

  drawGeometry(geometry : Geometry){
	const gl = this.glWindow.getGl();

    if (!geometry.isVerticesDataCreated)
    {
      this.bind(geometry);
    }

    // Run shader
	let model : mat4 = mat4();

	this.shader.setMat4("projection", glm::ortho(0.0f, this.window.getWidth(), this.window.GetHeight(), 0.0f, -1.0f, 1.0f));

    // Draw
    gl.bindVertexArray(geometry.VAO);
    gl.drawArrays(gl.TRIANGLES, 0, geometry.verticesData.vertexAmount);
    gl.bindVertexArray(0);
  }

	bind(geometry : Geometry)
	{
		const gl = this.glWindow.getGl();

		if (!geometry.isVerticesDataCreated){
			geometry.generateVertices();
		}
		if (!geometry.isVerticesDataCreated){
			return;
		}
		if (geometry.VAO == null || geometry.VBO == null){
      		geometry.VBO = gl.createBuffer();
     		 geometry.VAO = gl.createVertexArray();
			gl.bindBuffer(gl.ARRAY_BUFFER, geometry.VBO);
			gl.bindVertexArray(geometry.VAO);
		}

		let verticesData = geometry.verticesData;

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesData.values), gl.STATIC_DRAW);

		let previewsVertexDefinition = 0;
		for (let i = 0; i < verticesData.vertexDefinition.length; i++)
		{
			previewsVertexDefinition += i != 0 ? verticesData.vertexDefinition[i - 1] : 0;
			gl.vertexAttribPointer(i, verticesData.vertexDefinition[i], gl.FLOAT, false, verticesData.vertexSize, previewsVertexDefinition * 4);
			gl.enableVertexAttribArray(i);
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, 0);
		gl.bindVertexArray(0);
	}
}
