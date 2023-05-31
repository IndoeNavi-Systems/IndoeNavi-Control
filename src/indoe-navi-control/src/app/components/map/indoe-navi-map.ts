import { RouteNode } from "src/app/models/route-node";

export class IndoeNaviMap{
    canvas : HTMLCanvasElement;
    ctx : CanvasRenderingContext2D;

    xPos : number = 0;
    yPos : number = 0;
    xPosStart : number = 0;
    yPosStart : number = 0;
    zoomFactor : number = 1.0;

    routeNodes : RouteNode[] = [];

    constructor(canvas : HTMLCanvasElement){
        this.canvas = canvas;
        this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    }

    initialize(){
        let canvas = this.canvas;
        let ctx = this.ctx;
        let self = this;

        canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }
        canvas.onwheel = function(event){
            event.preventDefault();
        };
        canvas.addEventListener("mousemove", function(event : MouseEvent) { self.handleCameraMovement(event); }, false);
        canvas.addEventListener("mousedown", function(event : MouseEvent) { 
            self.xPosStart = event.offsetX - self.xPos; 
            self.yPosStart = event.offsetY - self.yPos; 

            if (event.buttons == 2){
                self.routeNodes.push({x: self.xPosStart, y: self.yPosStart, isDestination: false, routeNodes: [], name: []});
            }
           
        }, false);
        setInterval(function() { self.loop(); }, 15);
    }

    handleCameraMovement(event : MouseEvent){
        if (event.buttons == 1){
            this.xPos = event.offsetX - this.xPosStart;
            this.yPos = event.offsetY - this.yPosStart;
        }
       
    }

    loop(){
        let canvas = this.canvas;
        let ctx = this.ctx;

        ctx.fillStyle = "rgb(240, 240, 240)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var img = <CanvasImageSource>document.getElementById("mapImage");
        ctx.drawImage(img, this.xPos, this.yPos);

        ctx.strokeStyle = "white";
        ctx.fillStyle = 'green';

        for (let i = 0; i < this.routeNodes.length; i++){
            ctx.beginPath();
            ctx.arc(this.routeNodes[i].x + this.xPos, this.routeNodes[i].y + this.yPos, 6, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke();
        }
    }
}