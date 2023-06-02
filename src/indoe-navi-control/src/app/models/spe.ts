var idIndex = 0;

export class SPE{
    public id : number;
    public x : number;
    public y : number;
    public name : string;

    public constructor(x : number, y : number, name : string) {
        this.id = idIndex++;
        this.x = x;
        this.y = y;
        this.name = name;
    }

    public distanceToPoint(x : number, y : number) : number{
      return Math.sqrt(Math.abs((x - this.x)**2 + (y - this.y)**2));
    }
}
