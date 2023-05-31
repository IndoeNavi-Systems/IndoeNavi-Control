import { Renderer } from "./renderer";
import { Shader } from "./shader";

export class GLWindow{
    private glCanvas : HTMLCanvasElement;
    private gl : WebGL2RenderingContext;

    private renderer : Renderer = new Renderer(this);

    constructor(glCanvas : HTMLCanvasElement){
        this.glCanvas = glCanvas;
        this.gl = <WebGL2RenderingContext>glCanvas.getContext("webgl2");
    }

    public getWidth() : number{
        return this.glCanvas.width;
    }
    public getHeight() : number{
        return this.glCanvas.height;
    }
    public getGl() : WebGL2RenderingContext{
        return this.gl;
    }
    public initialize(){
        if (this.gl === null) {
          alert("Unable to initialize WebGL. Your browser or machine may not support it.");
          return;
        }
    
        let shader = new Shader(this, "basic2d", "attribute vec2 position;\n\nuniform mat4 model;\nuniform mat4 projection;\n\nvoid main()\n{\n    gl_Position = projection * model * vec4(position.xy, 0.0, 1.0);\n}", "varying vec4 color;\n\nuniform vec3 globalColor;\nuniform float alpha;\n\nvoid main()\n{    \n    color = vec4(globalColor, alpha);\n}  ");
        shader.load();

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}