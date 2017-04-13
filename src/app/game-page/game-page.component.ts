import { Component, OnInit } from '@angular/core';
import { FetchGameService } from "app/fetch-game.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { ICategory } from "app/icategory";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  private sub: Subscription;
  private gameId: string;
  private gameName: string;
  categories: ICategory[];

  constructor(private _fetchCategoriesGameService: FetchGameService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(
      params => {
        this.gameId = params['id'];
      }
    );

    this._fetchCategoriesGameService.getCategories(this.gameId)
    .subscribe(categories => this.categories = categories,
                error => console.error(error));
  }

  onCategoryClicked(categoryId:string) {
    this._router.navigate(['/game/' + this.gameId + '/' + categoryId]);
  }
}
