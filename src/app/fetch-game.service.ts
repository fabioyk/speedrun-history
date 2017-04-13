import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { IGame } from "app/igame";
import { ICategory } from "app/icategory";
import { IRun } from "app/irun";

@Injectable()
export class FetchGameService {
  private _gameListUrl = 'https://speedrun-history.glitch.me/api/games/';
  private _categoryListUrl = 'https://speedrun-history.glitch.me/api/game/';
  private _runListUrl = 'https://speedrun-history.glitch.me/api/runs/';

  constructor(private _http: Http) { }

  getGames(): Observable<IGame[]> {
    return this._http.get(this._gameListUrl)
      .map((response:Response) => <IGame[]> response.json())
      .catch(this.handleError);
  }

  getCategories(gameId:string): Observable<ICategory[]> {
    return this._http.get(this._categoryListUrl + gameId)
      .map((response:Response) => <ICategory[]> response.json())
      .catch(this.handleError);
  }

  getRuns(gameId: string, categoryId: string): Observable<IRun[]> {
    return this._http.get(this._runListUrl + gameId + '/' + categoryId)
      .map((response:Response) => <IRun[]> response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
