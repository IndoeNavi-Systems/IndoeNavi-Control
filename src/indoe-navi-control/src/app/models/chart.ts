export abstract class Chart{
  public title: string;
  public isEChart: boolean;

  constructor(title : string, isEChart : boolean){
      this.title = title;
      this.isEChart = isEChart;
  }

  public abstract getOptions() : any;
}
