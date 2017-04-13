import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { GameSearchBarComponent } from './game-search-bar/game-search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { GamePageComponent } from './game-page/game-page.component';
import { WrGraphPageComponent } from './wr-graph-page/wr-graph-page.component';
import { WrGraphComponent } from './wr-graph/wr-graph.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FetchGameService } from "app/fetch-game.service";
import { GameFilterPipe } from './game-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GameSearchBarComponent,
    SearchResultsComponent,
    GamePageComponent,
    WrGraphPageComponent,
    WrGraphComponent,
    WelcomeComponent,
    GameFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'home', component: WelcomeComponent },
      { path: '', component: WelcomeComponent, pathMatch: 'full' },
      { path: 'search/:query', component: SearchResultsComponent },
      { path: 'game/:id', component: GamePageComponent },
      { path: 'game/:id/:category', component: WrGraphPageComponent }
    ])
  ],
  providers: [FetchGameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
