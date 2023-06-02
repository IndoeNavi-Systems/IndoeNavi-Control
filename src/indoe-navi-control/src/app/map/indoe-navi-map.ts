import { IndoorMap } from "src/app/models/indoor-map";
import { SPE } from "src/app/models/spe";
import { Camrea } from "./camera";



export class IndoeNaviMap{
  private canvas : HTMLCanvasElement;
  private ctx : CanvasRenderingContext2D;
  private camera = new Camrea();

  private indoorMap : IndoorMap;
  public speNodeHovered : SPE | null = null;
  public speNodeSelected : SPE | null = null;

  public constructor(canvas : HTMLCanvasElement, indoorMap : IndoorMap){
      this.canvas = canvas;
      this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      this.indoorMap = indoorMap;
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
      this.indoorMap.spes.push(new SPE(this.camera.xPosStart, this.camera.yPosStart, ""));
    }

    this.speNodeHovered = this.indoorMap.getSPE(event.offsetX - this.camera.xPos, event.offsetY - this.camera.yPos);

    if (event.button == 0){
      this.speNodeSelected = this.speNodeHovered;
    }
  }

  private onMouseMove(event : MouseEvent){
    this.camera.xMouse = event.offsetX;
    this.camera.yMouse = event.offsetY;

    if (event.buttons == 1){
      if (this.speNodeSelected == null){
        this.camera.dragCamera(event.offsetX, event.offsetY);
      }
      else{
        this.speNodeSelected.x = event.offsetX - this.camera.xPos;
        this.speNodeSelected.y = event.offsetY - this.camera.yPos;
      }
    }

    this.speNodeHovered = this.indoorMap.getSPE(event.offsetX - this.camera.xPos, event.offsetY - this.camera.yPos);
  }

  private onKeyDown(event : KeyboardEvent){
    if (event.code == "Delete" && this.speNodeSelected != null){
      this.indoorMap.deleteSPE(this.speNodeSelected.id);
      this.speNodeSelected = null;
      this.speNodeHovered = null;
    }
  }

  private renderingLoop(){
      let speDiv = <HTMLElement>document.getElementById('speDiv');
      let canvas = this.canvas;
      let ctx = this.ctx;
      canvas.width  = speDiv.clientWidth;
      canvas.height = speDiv.getBoundingClientRect().height-5;

      this.drawBackground();
      this.drawSPENodes();

      if (this.speNodeHovered != null){
        this.drawSPENode("orange", this.speNodeHovered);
      }
      if (this.speNodeSelected != null){
        this.drawSPENode("red", this.speNodeSelected);
      }
  }

  private drawBackground(){
    let canvas = this.canvas;
    let ctx = this.ctx;
    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(<CanvasImageSource>document.getElementById("mapImage"), this.camera.xPos, this.camera.yPos);
  }

  private drawSPENodes(){
    for (let i = 0; i < this.indoorMap.spes.length; i++){
      this.drawSPENode("green", this.indoorMap.spes[i]);
    }
  }

  private drawSPENode(color : string, spe : SPE){
    let ctx = this.ctx;
    ctx.strokeStyle = "white";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(spe.x + this.camera.xPos, spe.y + this.camera.yPos, 6, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }
}
