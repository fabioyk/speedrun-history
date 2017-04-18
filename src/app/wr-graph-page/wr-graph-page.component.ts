import { Component, OnInit } from '@angular/core';
import { FetchGameService } from "app/fetch-game.service";
import { Router, ActivatedRoute } from "@angular/router/";
import { Subscription } from "rxjs/Subscription";
import { IRun } from "app/irun";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserModule} from '@angular/platform-browser';
import * as d3 from 'd3';
import { ICategory } from "app/icategory";
import { ISubcategory } from "app/isubcategory";

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
  private subcategories: any[]; 
  private selectedSubcategories: string[];
  multi = [];

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
        var _categoryId = this.categoryId;
        var _subcategories = this.subcategories;

        Observable.forkJoin([
          this._fetchCategoriesGameService.getRuns(this.gameId, this.categoryId),
          this._fetchCategoriesGameService.getCategories(this.gameId)
        ]).subscribe(results => {
          var runs:IRun[] = results[0];
          var categories = results[1];
          
          categories.forEach(function(cat) {
            if (cat.id === _categoryId) {
              _subcategories = cat.subcategories;
              return;
            }
          });

          console.log(runs);
          
          this.multi = this.processRunsIntoData(this.getWrHoldersRuns(runs, [_subcategories[0][0].id]));
        }, error => console.error(error));
      }
    );   

  }


  getWrHoldersRuns(runs:IRun[], gameSubcategories:string[]):IRun[] {
    // filter runs by category
    var filteredRuns:IRun[] = [];

    runs.forEach(run => {
      var subc = <string[]>run.subcategories;
      if (!(!run.subcategories || subc.indexOf(gameSubcategories[0]) === -1 )) {
        filteredRuns.push(run);
      }
    });

    // lookup all wr holders    
    var wrHolders: ISubcategory[] = [];
    var wrTime = filteredRuns[0].time;

    wrHolders.push({id: filteredRuns[0].playerId, name:filteredRuns[0].playerName});

    filteredRuns.forEach(run => {
      if (run.time <= wrTime) {
        wrTime = run.time;
        var runner:ISubcategory = {
          id: run.playerId, name: run.playerName
        }
        if (!this.checkIfPersonInArray(wrHolders, runner)) {
          wrHolders.push(runner);
        }
      }
    });

    // get all wr holders runs
    var wrHoldersRuns:IRun[] = [];

    filteredRuns.forEach(run => {      
      if (this.checkIfPersonInArray(wrHolders, {id: run.playerId, name: run.playerName})) {
        wrHoldersRuns.push(run);
      }
    });

    return wrHoldersRuns;
  }

  checkIfPersonInArray(people:ISubcategory[], person:ISubcategory) {
    var flag = false;
    people.forEach(p => {
      if (p.id === person.id && p.name === person.name) {
        flag = true;
      }
    });
    return flag;
  }

  processRunsIntoData(runs:IRun[]):any[] {
    var arr = [];
    var people = [];
    //console.log(gameSubcategories);
    runs.forEach(run => {      
      // var subc = <string[]>run.subcategories;
      // //console.log(subc);
      // if (!run.subcategories || subc.indexOf(gameSubcategories[0]) === -1 ) {
      //   //console.log('backing out');
      //   return;
      // }
      // if (!run['subcategories'] || run['subcategories'][Object.keys(run['subcategories'])[0]] != subcategories[0].id)  {
      //   return;
      // }

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
    console.log(arr);
    return arr;
  }

  convertTime(stringDate:string):Date {
    var arr = stringDate.split('-');
    return new Date(+arr[0], +arr[1], +arr[2]);
  }

}
