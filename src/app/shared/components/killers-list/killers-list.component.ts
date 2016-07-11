import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';

import { KillerComponent } from '../killer/killer.component';

@Component({
  selector: 'app-killers-list',
  styleUrls: ['killers-list.component.scss'],
  directives: [KillerComponent],
  template: `
    <div class="killersList">
      <ul class="killersList__container">
        <li class="killersList__item" *ngFor="let killer of killers">
           <button type="button"
             class="btn btn__remove btn--circle killersList__btnRemove"
             (click)="onRemove(killer.uuid)">
             x
            </button>
            <app-killer [name]="killer.name" [uuid]="killer.uuid"></app-killer>
        </li>
      </ul>
    </div>
  `
})
export class KillersListComponent implements OnInit {

  @Input() killers;
  @Output('deleted') whenKillerDeleted = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {

  }

  onRemove(uuid) {
    this.whenKillerDeleted.emit(uuid);
  }

}
