import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Player, Team } from '../models';
import { TeamService } from '../team.service';

import { TeamViewComponent } from './team-view.component';

describe('TeamViewComponent', () => {
  let component: TeamViewComponent;
  let fixture: ComponentFixture<TeamViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamViewComponent],
      providers: [{provide:TeamService, useClass:MockTeamService},{provide:Router, useClass:MockRouter}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockRouter{
  
}

class MockTeamService{
  teamList =[new Team()]
  player = new Player();
  getTeamList(){
    return this.teamList;
  }
  getLeastPickedPlayer(){
    return this.player;
  }getMostPickedPlayer(){
    return this.player;
  }
  getHighestAgeTeams(){
    return this.teamList;
  }
  getLowestAgeTeams(){
    return this.teamList;
  }
}