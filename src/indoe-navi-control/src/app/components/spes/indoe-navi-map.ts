import { IndoorMap } from "src/app/models/indoor-map";
import { SPE } from "src/app/models/spe";
import { Camera } from "./camera";

export class IndoeNaviMap{
  public speNodeHovered : SPE | null = null;
  public speNodeSelected : SPE | null = null;
  private mapUpdatedEvent = new CustomEvent("mapupdated", {detail: 3});
  private canvas : HTMLCanvasElement;
  private ctx : CanvasRenderingContext2D;
  private camera = new Camera();
  private indoorMap : IndoorMap;

  public constructor(canvas : HTMLCanvasElement, indoorMap : IndoorMap){
      this.canvas = canvas;
      this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      this.indoorMap = indoorMap;
  }

  public initialize(){
      let canvas = this.canvas;
      let self = this;

      this.ctx.translate(4.1, 4.1);

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
      this.indoorMap.spes.push({x: this.camera.xPosStart, y: this.camera.yPosStart, name: "Ny SPE", macAdress: "00:00:00:00"});
      this.canvas.dispatchEvent(this.mapUpdatedEvent);
    }

    this.speNodeHovered = this.indoorMap.findSPEByPosition(event.offsetX - this.camera.xPos, event.offsetY - this.camera.yPos);

    if (event.button == 0){
      this.speNodeSelected = this.speNodeHovered;
      if (this.speNodeSelected == null){
        this.canvas.dispatchEvent(this.mapUpdatedEvent);
      }
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

    this.speNodeHovered = this.indoorMap.findSPEByPosition(event.offsetX - this.camera.xPos, event.offsetY - this.camera.yPos);
  }

  private onKeyDown(event : KeyboardEvent){
    if (event.code == "Delete" && this.speNodeSelected != null){
      this.indoorMap.deleteSPE(this.speNodeSelected);
      this.speNodeSelected = null;
      this.speNodeHovered = null;
      this.canvas.dispatchEvent(this.mapUpdatedEvent);
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
        this.drawSPENode("rgba(255, 255, 0, 0.4)", this.speNodeHovered);
      }
      if (this.speNodeSelected != null){
        this.drawSPENode("rgba(0, 255, 0, 0.4)", this.speNodeSelected);
      }
  }

  private drawBackground(){
    let canvas = this.canvas;
    let ctx = this.ctx;
    ctx.fillStyle = "rgba(240, 240, 240)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(<CanvasImageSource>document.getElementById("mapImage"), this.camera.xPos, this.camera.yPos);
  }

  private drawSPENodes(){
    for (let i = 0; i < this.indoorMap.spes.length; i++){
      this.drawSPENode("rgba(0, 0, 0, 0)", this.indoorMap.spes[i]);
    }
  }

  private drawSPENode(color : string, spe : SPE){
    let ctx = this.ctx;
    let speImage = <CanvasImageSource>document.getElementById("speImage");
    let xCenter = (<number>speImage.width / 2.0);
    let yCenter = (<number>speImage.height / 2.0);

    ctx.drawImage(speImage, spe.x + this.camera.xPos - xCenter, spe.y + this.camera.yPos - yCenter);

    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(spe.x + this.camera.xPos, spe.y + this.camera.yPos, 40, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.font = "bold 24px Arial";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.strokeText(spe.name, spe.x + this.camera.xPos , spe.y + this.camera.yPos - yCenter);
    ctx.fillText(spe.name, spe.x + this.camera.xPos , spe.y + this.camera.yPos - yCenter);
  }
}
