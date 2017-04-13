import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FetchGameService } from "app/fetch-game.service";
import { IGame } from "app/igame";
import { Router } from "@angular/router";

@Component({
  selector: 'app-game-search-bar',
  templateUrl: './game-search-bar.component.html',
  styleUrls: ['./game-search-bar.component.css']
})
export class GameSearchBarComponent implements OnChanges, OnInit {
  @Input() initialWord:string;
  @Output() changedQuery: EventEmitter<string> = new EventEmitter<string>();

  games: IGame[];
  filterWord: string;

  constructor(private _router: Router) { }

  ngOnInit():void {
    if (this.initialWord) {
      this.filterWord = this.initialWord;
    }
  }

  ngOnChanges():void {
    console.log('changed!');
      this.changedQuery.emit(this.filterWord);
  }

  onClickSearch():void {
    this._router.navigate(['/search/' + this.filterWord]);
  }

}
