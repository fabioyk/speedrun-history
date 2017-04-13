import { Component, OnInit } from '@angular/core';
import { FetchGameService } from "app/fetch-game.service";
import { IGame } from "app/igame";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  games: IGame[];
  filterWord: string;
  private sub: Subscription;

  constructor(private _fetchGameService: FetchGameService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(
      params => {
        this.filterWord = params['query'];
      }
    );

    this._fetchGameService.getGames()
    .subscribe(games => this.games = games,
                error => console.error(error));
  }

  onGameClicked(gameId:string):void {
    this._router.navigate(['/game/' + gameId]);
  }

  onChangedQuery(message: string):void {
    console.log('Disparou',message);
    if (message)
      this.filterWord = message;
  }

}
