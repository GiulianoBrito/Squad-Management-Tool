import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Player, Team } from './models';

import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;
  let players = [{
        name: 'Zinedini Zidane',
        age: 23,
        nacionality: 'France',
        initials: 'ZZ',
      },
      {
        name: 'Cristiano Ronaldo',
        age: 30,
        nacionality: 'Portugal',
        initials: 'CR',
      },
      {
        name: 'Ronaldo da Silva de Souza',
        age: 18,
        nacionality: 'Brazil',
        initials: 'RS',
      },
      {
        name: 'Giuliano Brito',
        age: 24,
        nacionality: 'Brazil',
        initials: 'GB',
      },
      {
        name: 'José Silva',
        age: 20,
        nacionality: 'Brazil',
        initials: 'JS',
      },
      {
        name: 'João Santos',
        age: 23,
        nacionality: 'Brazil',
        initials: 'JS',
      },
      {
        name: 'Mateus Alves',
        age: 26,
        nacionality: 'Brazil',
        initials: 'MA',
      },
    ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{provide:HttpClient,useClass:MockHttp}]
    });
    service = TestBed.inject(TeamService);
    service.setAllPlayers(players);
      let team1  = new Team();
      team1.avgAge = 10;
      service.addTeam(team1);
      let team2 = new Team();
      team2.avgAge = 20;
      service.addTeam(team2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return matching',()=>{
    let playerList :Player[];
    playerList = service.getMatchingPlayers('Giuliano');
    expect(playerList.length).toBe(1);
  });

  it('should return lowestAge',()=>{
    let teamList :Team[];
    teamList = service.getLowestAgeTeams();
    expect(teamList[0].avgAge).toBe(10);
  });

  it('should return highestAge',()=>{
    let teamList :Team[];
    teamList = service.getHighestAgeTeams();
    expect(teamList[0].avgAge).toBe(20);
  });

  it('should add team',()=>{
    let team = new Team();
    team.name = "test";
    service.addTeam(team);
    expect(service.getTeamList().indexOf(team)).toBeGreaterThan(0);
  })

  it('should remove team',()=>{
    let team = new Team();
    team.name = "test";
    service.addTeam(team);
    expect(service.getTeamList().indexOf(team)).toBeGreaterThan(0);
    service.removeTeam(team);
    expect(service.getTeamList().indexOf(team)).toBe(-1);
  })


});

class MockHttp{
  get(){
    return new Subject();
  }
}