import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Player, Team } from '../models';
import { TeamService } from '../team.service';

import { TeamEditComponent } from './team-edit.component';

describe('TeamEditComponent', () => {
  let component: TeamEditComponent;
  let fixture: ComponentFixture<TeamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamEditComponent],
      imports:[FormsModule],
      providers: [{provide:TeamService, useClass:MockTeamService},{provide:Router, useClass:MockRouter},{provide:DragulaService, useClass:MockDragula}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockDragula{
  createGroup(){

  }
}


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
  getTeam(){
    return this.teamList[0];
  }
  isLoaded(){
    return false;
  }
  getMatchingPlayers(){
    return this.teamList;
  }
}
