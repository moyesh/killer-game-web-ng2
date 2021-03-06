import { Component, Inject, OnDestroy } from '@angular/core';

import { KillersService } from 'src/app/services';

import { KillersBoardComponent, KillersListComponent, AddKillerFormComponent } from 'src/app/components';

import { ADD_KILLER, REMOVE_KILLER } from 'src/app/reducers/killersReducer';

@Component({
  selector: 'create-players',
  providers: [],
  styles: [`
    .createPlayers__addPlayerContainer {
      position: absolute;
      bottom: 70px;
      left: 10px;
      right: 10px;
    }

    .createPlayers__minKillers {
      font-size: 12px;
      font-weight: 300;
    }
  `],
  template: `
    <div class="createPlayers center">
      <killers-board>
        <board-header>
          {{killers.length}} Killers <span class="createPlayers__minKillers">(min killers 3)</span>
        </board-header>

        <board-body>
          <killers-list [killers]="killers"
                (deleted)="onRemove($event)"></killers-list>
          <div class="createPlayers__addPlayerContainer">
            <add-killer-form (addedKiller)="onKillerAdded($event)"></add-killer-form>
          </div>
        </board-body>

        <board-actions>
          <a class="btn btn__start btn--ellipse"
             [ngClass]="{'btn--disabled': killers.length < 3}"
             routerLink="/playersPresentation">
            Start
          </a>
        </board-actions>
      </killers-board>
    </div>
  `
})
export class CreatePlayersComponent implements OnDestroy {

  killers;
  unsubscribe;

  constructor(@Inject('AppStore') private store, private killersService: KillersService) {
    this.unsubscribe = this.store.subscribe(() => this.setKillers());
    this.setKillers();
  }

  setKillers() {
    this.killers = this.store.getState().killers;
  }

  onKillerAdded(killerName) {
    const k = this.killersService.getKillerObj(killerName);
    this.store.dispatch({ type: ADD_KILLER, killer: k });
  }

  onRemove(uuid) {
    this.store.dispatch({ type: REMOVE_KILLER, uuid: uuid });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
