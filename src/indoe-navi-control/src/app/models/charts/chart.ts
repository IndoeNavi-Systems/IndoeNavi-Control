export abstract class Chart{
    title: string;
    isEChart: boolean;

    constructor(title : string, isEChart : boolean){
        this.title = title;
        this.isEChart = isEChart;
    }

    abstract getOptions() : any;
}