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
