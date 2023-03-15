import { Chart } from "./chart";

export interface ListChartRowValue{
    values : string[];
}

export interface ListChartTable{
    headers: string[];
    rows: ListChartRowValue[];
}

export class ListChart extends Chart{
    table : ListChartTable;

    constructor(title : string, table : ListChartTable){
        super(title, false);
        this.table = table;
    }

    getOptions() : any
    {
        return this.table;
    }
}
