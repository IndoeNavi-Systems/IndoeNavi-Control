import { GLWindow } from "./gl-window";

export class Shader{
    private glWindow : GLWindow;

    private id : WebGLProgram | null = null;
    private name : string;
    private vertexSource : string;
    private fragmentSource : string;

    constructor(glWindow : GLWindow, name : string, vertexSource : string, fragmentSource : string){
        this.glWindow = glWindow;
        this.name = name;
        this.vertexSource = vertexSource;
        this.fragmentSource = fragmentSource;
    }

    public load(){
        let gl = this.glWindow.getGl();
        this.id = gl.createProgram();
        this.createShader(this.vertexSource, this.name, gl.VERTEX_SHADER);
        this.createShader(this.fragmentSource, this.name, gl.VERTEX_SHADER);
        gl.linkProgram(<WebGLProgram>this.id);
        console.log("Shader loaded.");
    }

    public createShader(source : string, name : string, type : number){
        let gl = this.glWindow.getGl();
        let shader : WebGLShader = <WebGLShader>gl.createShader(type);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        console.log("Shader " + name + " compile info: " + gl.getShaderInfoLog(shader));

        gl.deleteShader(shader);
    }
}