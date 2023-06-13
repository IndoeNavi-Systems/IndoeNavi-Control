import { Chart } from "./chart";
import { DateValue } from "./date-value";

export interface BlockChartValue{
  label: string;
  value: number;
}

export class BlockChart extends Chart{
  public values : BlockChartValue[];

  constructor(title : string, values : BlockChartValue[]){
      super(title, true);
      this.values = values;
  }

  public addDateValue(dateValue : DateValue){
    this.values.push({label: (new Date(dateValue.date)).toLocaleDateString(), value: dateValue.count})
  }

  public getOptions() : any
  {
      var values = [];
      var labels = [];
      for (var i = 0; i < this.values.length; i++){
          values.push(this.values[i].value);
          labels.push(this.values[i].label);
      }

      const yMax = Math.max.apply(Math, values.map(function(o) { return o; }));
      const dataShadow = [];
      for (let i = 0; i < values.length; i++) {
        dataShadow.push(yMax);
      }

      return {
          xAxis: {
          data: labels,
            axisLabel: {
              inside: true,
              color: '#fff',
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            z: 10,
          },
          yAxis: {
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#999',
            },
          },
          dataZoom: [
            {
              type: 'inside',
            },
          ],
          series: [
            {
              // For shadow
              type: 'bar',
              itemStyle: {
                color: 'rgba(0,0,0,0.05)'
              },
              barGap: '-100%',
              barCategoryGap: '40%',
              data: dataShadow,
              animation: false,
            },
            {
              type: 'bar',
              itemStyle: {
              },
              emphasis: {
                itemStyle: {
                }
              },
              data: values,
            },
          ],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
      };
  }
}
