import { IndoorMap } from "src/app/models/indoor-map";
import { RouteNode } from "src/app/models/route-node";
import { SPE } from "src/app/models/spe";

export class Camrea{
  public xPos : number = 0;
  public yPos : number = 0;
  public xPosStart : number = 0;
  public yPosStart : number = 0;
  public xMouse : number = 0;
  public yMouse : number = 0;

  public startCameraDrag(x : number, y : number){
    this.xPosStart = x - this.xPos;
    this.yPosStart = y - this.yPos;
  }

  public dragCamera(x : number, y : number){
    this.xPos = x - this.xPosStart;
    this.yPos = y - this.yPosStart;
  }
}

export class IndoeNaviMap{
  private canvas : HTMLCanvasElement;
  private ctx : CanvasRenderingContext2D;
  private camera = new Camrea();

  private indoorMap = new IndoorMap("Ringsted", "", [], []);
  private routeNodeHovered : RouteNode | null = null;
  private routeNodeSelected : RouteNode | null = null;

  public constructor(canvas : HTMLCanvasElement){
      this.canvas = canvas;
      this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
  }

  public initialize(){
      let canvas = this.canvas;
      let self = this;

      canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }
      canvas.onwheel = function(event){
          event.preventDefault();
      };

      canvas.addEventListener("mousemove", function(event : MouseEvent) { self.onMouseMove(event); }, false);
      canvas.addEventListener("mousedown", function(event : MouseEvent) { self.onMouseDown(event); }, false);
      document.addEventListener("keydown", function(event : KeyboardEvent) { self.onKeyDown(event); }, false);

      setInterval(function() { self.renderingLoop(); }, 15);
  }

  private onMouseDown(event : MouseEvent){
    this.camera.startCameraDrag(event.offsetX, event.offsetY);

    if (event.buttons == 2){
      this.indoorMap.routeNodes.push(new RouteNode(this.camera.xPosStart, this.camera.yPosStart, false, [], []));
    }

    this.routeNodeHovered = this.indoorMap.getRouteNode(event.offsetX - this.camera.xPos, event.offsetY - this.camera.yPos);

    if (event.button == 0){
      this.routeNodeSelected = this.routeNodeHovered;
    }
  }

  private onMouseMove(event : MouseEvent){
    this.camera.xMouse = event.offsetX;
    this.camera.yMouse = event.offsetY;

    if (event.buttons == 1){
      if (this.routeNodeSelected == null){
        this.camera.dragCamera(event.offsetX, event.offsetY);
      }
      else{
        this.routeNodeSelected.x = event.offsetX - this.camera.xPos;
        this.routeNodeSelected.y = event.offsetY - this.camera.yPos;
      }
    }

    this.routeNodeHovered = this.indoorMap.getRouteNode(event.offsetX - this.camera.xPos, event.offsetY - this.camera.yPos);
  }

  private onKeyDown(event : KeyboardEvent){
    if (event.code == "Delete" && this.routeNodeSelected != null){
      this.indoorMap.deleteRouteNode(this.routeNodeSelected.id);
      this.routeNodeSelected = null;
      this.routeNodeHovered = null;
    }
  }

  private renderingLoop(){
      let canvas = this.canvas;
      let ctx = this.ctx;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;

      this.drawBackground();
      this.drawRouteNodes();

      if (this.routeNodeHovered != null){
        this.drawRouteNode("orange", this.routeNodeHovered);
      }
      if (this.routeNodeSelected != null){
        this.drawRouteNode("red", this.routeNodeSelected);
      }
  }

  private drawBackground(){
    let canvas = this.canvas;
    let ctx = this.ctx;
    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(<CanvasImageSource>document.getElementById("mapImage"), this.camera.xPos, this.camera.yPos);
  }

  private drawRouteNodes(){
    for (let i = 0; i < this.indoorMap.routeNodes.length; i++){
      this.drawRouteNode("green", this.indoorMap.routeNodes[i]);
    }
  }

  private drawRouteNode(color : string, routeNode : RouteNode){
    let ctx = this.ctx;
    ctx.strokeStyle = "white";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(routeNode.x + this.camera.xPos, routeNode.y + this.camera.yPos, 6, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }
}
