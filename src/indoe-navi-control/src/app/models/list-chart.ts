import { Chart } from "./chart";
import { NameValue } from "./name-value";

export interface ListChartRowValue{
    values : string[];
}

export interface ListChartTable{
    headers: string[];
    rows: ListChartRowValue[];
}

export class ListChart extends Chart{
  public table : ListChartTable;

    constructor(title : string, table : ListChartTable){
        super(title, false);
        this.table = table;
    }

    public addNameValue(dateValue : NameValue){
      this.table.rows.push({values: [dateValue.name, dateValue.count.toString()]});
    }

    public getOptions() : any
    {
        return this.table;
    }
}
