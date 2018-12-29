/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FavouritePlayersComponent } from './favourite-players.component';

describe('FavouritePlayersComponent', () => {
  let component: FavouritePlayersComponent;
  let fixture: ComponentFixture<FavouritePlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritePlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
