/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FavouriteTeamsComponent } from './favourite-teams.component';

describe('FavouriteTeamsComponent', () => {
  let component: FavouriteTeamsComponent;
  let fixture: ComponentFixture<FavouriteTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
