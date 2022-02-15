import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexTooltip, ApexTitleSubtitle, ApexAxisChartSeries, ApexNonAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexXAxis, ApexYAxis, ChartComponent, ApexTheme } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/shared/models/job.model';
import { Jobs } from 'src/app/shared/models/jobs.model';
import { JobService } from 'src/app/shared/services/job.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLables:ApexDataLabels;
  colors: ApexFill;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {

  @ViewChild("chart") chart: ChartComponent;
  jobs: Job[]
  jobsSub: Subscription
  selectedPeriod: number = 7

  public chartOptions: Partial<ChartOptions> | any;
  

  constructor(public jobService:JobService) { 
    this.initChart()
  }

  ngOnInit(): void {
    

    this.jobsSub = this.jobService.getAllJobs().subscribe((data:Jobs) =>{
      this.jobs=data.jobs
      this.jobService.calculateJobsStats(data)
      this.updatechartOptions();
    })

  }


  initChart(){
    this.chartOptions = {
      series: [],
      plotOptions:{
        bar:{
          columnWidth: '50%',
          borderRadius: 3,
        }
      },
      chart: {
        height: 500,
        type: "bar"
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: `Overview For Jobs Stats`
      },
      xaxis: {
        type: 'category',
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
    };
  }

  updatechartOptions(){

    if(this.selectedPeriod == 7){

      this.chartOptions.series =[
        {
          name: "pending",
          data: this.getChartData('pending',7)
        },
        {
          name: "interview",
          data:  this.getChartData('interview',7)
        },
        {
          name: "declined",
          data: this.getChartData('declined',7)
          
        }
      ]

      this.chartOptions.xaxis = {
        
        type: 'datetime',
        min: Date.now()-(6*86400000), // Where the 6 is the number of days
        max: Date.now(), // Today
      }

    }else if(this.selectedPeriod == 30){

      this.chartOptions.series =[
        {
          name: "pending",
          data: this.getChartData('pending',30)
        },
        {
          name: "interview",
          data:  this.getChartData('interview',30)
        },
        {
          name: "declined",
          data: this.getChartData('declined',30)
          
        }
      ]

      this.chartOptions.xaxis = {
        
        type: 'datetime',
        min: Date.now()-(29*86400000), // Where the 6 is the number of days
        max: Date.now(), // Today
      }
      // this.chartOptions.xaxis = {categories :['5th', '10th','15th','20th','25th','30th']}

    }else if(this.selectedPeriod == 90){
      this.chartOptions.xaxis = {categories :['sat', 'sun','mon','tus','thur','fri']}
    }
    
  }

  getChartData(seriesName: string, period: number){
    let dataArr = []

    for(let i=0; i<period; i++){
      dataArr.push([Date.now() - (i*86400000), 
                    this.calculateJobCountPerTime(Date.now()-(i*86400000), seriesName)
                  ])
    }
    console.log(dataArr.length);
    
    return dataArr

    //[
    //   [Date.now()-(5*86400000),522],
    //   [Date.now()-(4*86400000), 3000],
    //   [Date.now()-(3*86400000), 6000],
    //   [Date.now()-(2*86400000), 2000],
    //   [Date.now()-(86400000), 4000],
    //   [Date.now(), 5000]]
  }

  calculateJobCountPerTime(timeStamp: number, seriesName: string){
    return this.jobs.filter(job => {

      const creationTime = new Date(job.createdAt).getDay()
      const chartTime = new Date(timeStamp).getDay()

      return job.status ==seriesName && creationTime == chartTime

    }).length;

  }

  ngOnDestroy(): void {
    if(this.jobsSub) this.jobsSub.unsubscribe()
}

}
