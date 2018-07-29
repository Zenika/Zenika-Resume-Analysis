import {Component, ElementRef, Input, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';


@Component({
  selector: 'app-stat-histo-nb-annee-exp',
  templateUrl: './stat-histo-nb-annee-exp.component.html',
  styleUrls: ['./stat-histo-nb-annee-exp.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatHistoNbAnneeExpComponent implements OnInit {

  expanded: boolean = false;

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;


  @Input()
  datas : {key:string, doc_count: number}[];

  constructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
   }

  ngOnInit() {
    let self = this;
    let d3 = this.d3;
    let d3ParentElement: any;
    let svg: any;
    let colors: any = [];
    let data: {key: string, doc_count: number}[] = [];
    let padding: number = 25;
    let width: number = 500;
    let height: number = 150;
    let xScale: any;
    let yScale: any;
    let xColor: any;
    let xAxis: any;
    let yAxis: any;

    if (this.parentNativeElement !== null) {
      svg = d3.select(this.parentNativeElement)
        .append('svg')        // create an <svg> element
        .attr('width', width) // set its dimensions
        .attr('height', height);

      colors = ['red', 'yellow', 'green', 'blue'];

      xScale = d3.scaleBand()
        .domain(this.datas.map(function(d){ return d.key+5; }))
        .range([0, 200]);

      yScale = d3.scaleLinear()
        .domain([0,d3.max(this.datas, function(d) {return d.doc_count})])
        .range([100, 0]);

      xAxis = d3.axisBottom(xScale) // d3.js v.4
        .ticks(5)
        .scale(xScale);

      yAxis = d3.axisLeft(xScale) // d3.js v.4
        .scale(yScale)
        .ticks(7);

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (padding) + "," + padding + ")")
        .call(yAxis);

      svg.append('g')            // create a <g> element
        .attr('class', 'axis')   // specify classes
        .attr("transform", "translate(" + padding + "," + (height - padding) + ")")
        .call(xAxis);            // let the axis do its thing

       var rects = svg.selectAll('rect')
        .data(this.datas);
      rects.size();

      var newRects = rects.enter();

      newRects.append('rect')
        .attr('x', function(d,i) {
          return xScale(d.key+5 );
        })
        .attr('y', function(d) {
          return yScale(d.doc_count);
        })
        .attr("transform","translate(" + (padding -5  + 25) + "," + (padding - 5) + ")")
        .attr('height', function(d) {
          return height - yScale(d.doc_count) - (2*padding) + 5})
        .attr('width', 10)
        .attr('fill', function(d, i) {
          return colors[i];
        });
    }

  }
}
