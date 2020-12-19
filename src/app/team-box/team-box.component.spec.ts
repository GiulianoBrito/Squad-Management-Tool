import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Team } from '../models';
import { TeamService } from '../team.service';

import { TeamBoxComponent } from './team-box.component';

describe('TeamBoxComponent', () => {
  let component: TeamBoxComponent;
  let fixture: ComponentFixture<TeamBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamBoxComponent],
      providers: [{provide:TeamService, useClass:MockTeamService},{provide:Router, useClass:MockRouter}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBoxComponent);
    component = fixture.componentInstance;
    component.team = new Team();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockTeamService{

}

class MockRouter{

}