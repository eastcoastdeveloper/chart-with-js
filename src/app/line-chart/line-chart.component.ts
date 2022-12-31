import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as data from './data.json'; // Chart Data
import * as jsonOptions from './options.json'; // Menu Options

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class BasicLineChartComponent implements OnInit {
  chart: any;
  chartDataArray: any = []; // Chart Data
  optionsArray: any = []; // Menu Options
  optionsPanel: boolean; // Menu Status
  xGridVisible: boolean = true; // X Axis Lines
  yLabelVisible: boolean = true; // Y Axis Label
  selectedCheckbox: any; // InnerHTML of Selected Checkbox in Legend
  date: any = new Date();
  month: any = this.date.getMonth();
  months: any = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  xAxisVisible: boolean = true;
  currentMonth: any = this.months[this.month];

  @ViewChild('yAxis', { static: false }) yAxis: ElementRef;
  @ViewChild('xGrid', { static: false }) xGrid: ElementRef;

  ngOnInit() {
    // Push JSON to array
    for (let key in data.chartData) {
      if (data.chartData.hasOwnProperty(key)) {
        this.chartDataArray.push(data.chartData[key]);
      }
    }

    // Push JSON to options array
    for (let key in jsonOptions.menuOptions) {
      if (jsonOptions.menuOptions.hasOwnProperty(key)) {
        this.optionsArray.push(jsonOptions.menuOptions[key]);
      }
    }
  }

  ngAfterViewInit() {
    let data: any,
      options: any,
      ctx: any = document.getElementById('lineChart') as HTMLElement;

    data = {
      datasets: [
        {
          label: 'Product A',
          backgroundColor: '',
          borderColor: '#02a9f7',
          data: this.chartDataArray[0].line,
          fill: false,
        },
        {
          label: 'Product B',
          fill: false,
          backgroundColor: '',
          borderColor: '#02577a',
          data: this.chartDataArray[1].line,
        },
      ],
      fill: false, // Change this to true, add rgba(...) in datasets background color
    };

    data.labels = this.months;

    options = {
      maintainAspectRatio: false, // Enables custom canvas dimension
      responsive: true,
      layout: {
        padding: {
          top: 20,
          right: 20,
          left: 20,
          bottom: 0,
        },
      },
      title: {
        display: false,
        text: '',
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      legend: {
        display: false,
        position: '',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: { display: this.xAxisVisible },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };

    this.chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    // 10 line spaced 10% apart. See options.json
    this.generateXgridLines(10, 10);
  }

  // Generate X Axis Grid
  // Clear div
  // Inject divs with dynamic styling
  generateXgridLines(lineCount: number, percentage: number) {
    this.xGrid.nativeElement.innerHTML = '';
    this.selectedCheckbox = lineCount;
    for (var i = 1; i < lineCount; i++) {
      this.xGrid.nativeElement.innerHTML +=
        "<div style='top:" +
        Math.round(percentage * i) +
        "%' class='xLines'></div>";
    }
  }

  // Change x axis line count
  // Select Checkbox on Line Number
  changeLineCount(xLines: any, e: any) {
    this.generateXgridLines(xLines.value, xLines.percent);
    this.selectedCheckbox = e.target.parentElement.querySelector('p').innerHTML;
  }

  // Toggle options menu
  toggleOptions() {
    this.optionsPanel = !this.optionsPanel;
  }

  // Select top three menu items
  selectItem(i: any) {
    if (this.optionsArray[i].item === 'Y Axis') {
      this.yLabelVisible = !this.yLabelVisible;
    }
    if (this.optionsArray[i].item === 'X Axis Labels') {
      this.xAxisVisible = !this.xAxisVisible;
      this.chart.options.scales.xAxes[0].display = this.xAxisVisible;
      this.chart.update();
    }
    if (this.optionsArray[i].item === 'X Axis Grid Lines') {
      this.xGridVisible = !this.xGridVisible;
    }
    this.optionsArray[i].checkMark = !this.optionsArray[i].checkMark;
  }
}
