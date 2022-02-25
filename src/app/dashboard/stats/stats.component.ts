import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/shared/models/job.model';
import { Jobs } from 'src/app/shared/models/jobs.model';
import { JobService } from 'src/app/shared/services/job.service';
import { Chart, registerables,TimeSeriesScale } from 'chart.js';
import 'chartjs-adapter-moment';
import * as moment from 'moment';
import { Title, Meta } from '@angular/platform-browser';
Chart.register(...registerables);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("chart") chart: ElementRef;
  jobs: Job[]
  jobsSub: Subscription
  selectedPeriod: number = 7
  isBrowser:boolean
 
  

// ------------------------------------------------------------------
  constructor(
    public jobService:JobService,
    private title:Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) platformId: object) { 
      this.isBrowser = isPlatformBrowser(platformId);

  }

  ngOnInit(): void {

    
    this.jobsSub = this.jobService.getAllJobs().subscribe((data:Jobs) =>{
      this.jobs=data.jobs
      this.jobService.calculateJobsStats(data)
      if(this.isBrowser){
        this.initchart()
      }
    })


    this.title.setTitle('Jopify - Stats')
    this.meta.addTags([{name: 'description', content: 'jobs status and progress'}])
  }

  ngAfterViewInit(): void {

  }

  initchart(){
    
    new Chart(this.chart.nativeElement, {
      type:'bar',
      data: this.getData(),
      options: {
          scales: {
              xAxis: {
                  type: 'time',
                  time: {
                      unit: 'month',

                  }
              },
              y:{
                ticks: {
                  stepSize: 1
              }
              }
          }
      } 
    })
  }

  getData(){
 
    let data:any={
      
      datasets:[{
        label:'pinding',
        data:[],
        backgroundColor:'rgba(255, 159, 64,.7)'
      },
      {
        label:'interview',
        data:[] ,
        backgroundColor:'rgba(54, 162, 235,.7)'
      },
      {
        label:'declined',
        data:[],
        backgroundColor:'rgba(255, 99, 132,.7)'
      }]
    };


    let interviewJobsMap:any={}
    let penddingJobsMap:any={}
    let declinedJobsMap:any={}

    // filter jobs by Status
    let interviewJobs=this.jobs.filter(job => job.status == 'interview')
    let penddingJobs=this.jobs.filter(job => job.status == 'pending')
    let declinedJobs=this.jobs.filter(job => job.status == 'declined')

    // extract data based on date created and calculate Map per certain time 
    interviewJobs.forEach(job=>{
      console.log(job.createdAt);
      
      let jobDate= moment(job.createdAt).format("MMM YYYY")
      interviewJobsMap[jobDate] = (interviewJobsMap[jobDate] || 0) + 1
    })

    penddingJobs.forEach(job=>{
      let jobDate= moment(job.createdAt).format("MMM YYYY")
      penddingJobsMap[jobDate] = (penddingJobsMap[jobDate] || 0) + 1
    })

    declinedJobs.forEach(job=>{
      let jobDate= moment(job.createdAt).format("MMM YYYY")
      declinedJobsMap[jobDate] = (declinedJobsMap[jobDate] || 0) + 1
    })

    
    // assin chart datasets
    for(let prop in penddingJobsMap){
      data.datasets[0].data.push({x: prop,y: penddingJobsMap[prop]})
    }

    for(let prop in interviewJobsMap){
      data.datasets[1].data.push({x: prop,y: interviewJobsMap[prop]})
    }


    for(let prop in declinedJobsMap){
      data.datasets[2].data.push({x: prop,y: declinedJobsMap[prop]})
    }
    
    return data
  }


  ngOnDestroy(): void {
    if(this.jobsSub) this.jobsSub.unsubscribe()
}

}
