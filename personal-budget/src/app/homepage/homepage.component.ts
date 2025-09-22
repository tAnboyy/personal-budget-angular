import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import * as d3 from 'd3';
import { DataService, BudgetItem } from '../services/data.service';

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent, BreadcrumbsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  constructor(private dataService: DataService) {
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

  createD3Chart(data: BudgetItem[]) {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Clear previous chart if any
    d3.select("#d3Chart").selectAll("*").remove();

    const svg = d3
      .select("#d3Chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d: BudgetItem) => d.title))
      .range(d3.schemeCategory10);

    const pie = d3.pie<BudgetItem>().value((d: BudgetItem) => d.budget);

    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);

    const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

    arcs
      .append("path")
      .attr("d", (d: any) => arc(d))
      .attr("fill", (d: any) => color(d.data.title) as string);

    arcs
      .append("text")
      .attr("transform", (d: any) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d: any) => d.data.title);
  }

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
    // Fetch data using the DataService
    this.dataService.fetchBudgetData().subscribe({
      next: (response) => {
        this.populateChartsFromService();
      },
      error: (error) => {
        console.error('Error fetching budget data:', error);
        // Still show the page content even if charts fail
      }
    });
  }

  private populateChartsFromService(): void {
    const budgetData = this.dataService.getBudgetData();
    
    // Clear existing data
    this.dataSource.datasets[0].data = [];
    this.dataSource.labels = [];
    
    // Populate chart data from service
    for (let i = 0; i < budgetData.length; i++) {
      this.dataSource.datasets[0].data[i] = budgetData[i].budget;
      this.dataSource.labels[i] = budgetData[i].title;
    }
    
    // Create both charts
    this.createChart();
    this.createD3Chart(budgetData);
  }
}
