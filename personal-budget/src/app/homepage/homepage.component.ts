import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  createChart() {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    if (ctx) {
      const myPieChart = new Chart(ctx, {
        type: "pie",
        data: this.dataSource,
      });
    }
  }

  //     createD3Chart(data) {
  //       const width = 400;
  //       const height = 400;
  //       const radius = Math.min(width, height) / 2;

  //       // Clear previous chart if any
  //       d3.select("#d3Chart").html("");

  //       const svg = d3
  //         .select("#d3Chart")
  //         .append("svg")
  //         .attr("width", width)
  //         .attr("height", height)
  //         .append("g")
  //         .attr("transform", `translate(${width / 2},${height / 2})`);

  //       const color = d3
  //         .scaleOrdinal()
  //         .domain(data.map((d) => d.title))
  //         .range(d3.schemeCategory10);

  //       const pie = d3.pie().value((d) => d.budget);

  //       const arc = d3.arc().innerRadius(0).outerRadius(radius);

  //       const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

  //       arcs
  //         .append("path")
  //         .attr("d", arc)
  //         .attr("fill", (d) => color(d.data.title));

  //       arcs
  //         .append("text")
  //         .attr("transform", (d) => `translate(${arc.centroid(d)})`)
  //         .attr("text-anchor", "middle")
  //         .text((d) => d.data.title);
  //     }

  dataSource = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ["#ffcd56", "#ff6384", "#36a2eb", "#fd6b19"],
      },
    ],
    labels: [] as string[],
  };

  ngOnInit(): void {
    debugger
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
            this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
            this.dataSource.labels[i] = res.myBudget[i].title;
          }
          this.createChart();
          // this.createD3Chart(res.myBudget);
    });
  }}
