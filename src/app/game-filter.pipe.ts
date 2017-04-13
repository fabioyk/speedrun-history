import { Pipe, PipeTransform } from '@angular/core';
import { IGame } from "app/igame";

@Pipe({
  name: 'gameFilter'
})
export class GameFilterPipe implements PipeTransform {

  transform(value: IGame[], filterBy: string): IGame[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((game: IGame) =>
        game.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }

}
