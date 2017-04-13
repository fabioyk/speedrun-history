import { Component, OnInit } from '@angular/core';
import { FetchGameService } from "app/fetch-game.service";
import { Router, ActivatedRoute } from "@angular/router/";
import { Subscription } from "rxjs/Subscription";
import { IRun } from "app/irun";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserModule} from '@angular/platform-browser';
import * as d3 from 'd3';

@Component({
  selector: 'app-wr-graph-page',
  templateUrl: './wr-graph-page.component.html',
  styleUrls: ['./wr-graph-page.component.css']
})
export class WrGraphPageComponent implements OnInit {
  private sub: Subscription;
  private gameId: string;
  private categoryId: string;
  private runs: IRun[];

  multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "2010",
        "value": 5000002
      },
      {
        "name": "2011",
        "value": 5800000
      }
    ]
  }
];

  view: any[] = [1400, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Time';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
    
  onSelect(event) {
    console.log(event);
    console.log(this);
  }

  constructor(private _fetchCategoriesGameService: FetchGameService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(
      params => {
        this.gameId = params['id'];
        this.categoryId = params['category'];
      }
    );

    this._fetchCategoriesGameService.getRuns(this.gameId, this.categoryId)
    .subscribe(runs => this.multi = this.processRunsIntoData(runs),
                error => console.error(error));
  }

  processRunsIntoData(runs:IRun[]):any[] {
    var arr = [];
    var people = [];

    runs.forEach(run => {
      var obj = {
            name:  this.convertTime(run.runDate),
            value: run.time,
            link: run.runUrl
          };
      if (people.indexOf(run.playerName) === -1) {
        arr.push({
          name: run.playerName,
          series: [obj]
        });
        people.push(run.playerName);
      } else {
        arr.forEach(o => {
          if (o.name === run.playerName) {
            o.series.push(obj);
            return;
          }          
        });
      }

    });

    return arr;
  }

  convertTime(stringDate:string):Date {
    var arr = stringDate.split('-');
    return new Date(+arr[0], +arr[1], +arr[2]);
  }

}
