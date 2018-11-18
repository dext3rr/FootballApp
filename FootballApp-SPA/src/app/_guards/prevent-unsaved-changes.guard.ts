import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PlayerEditComponent } from '../player/player-edit/player-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<PlayerEditComponent> {
    canDeactivate(component: PlayerEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Czy na pewno chcesz opuscić tę stronę? Niezapisane zmiany zostaną utracone.');
        }
        return true;
    }
}