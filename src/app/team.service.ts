import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Team } from './models';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private playerDroppedSource = new Subject<String>();
  playerDropped$ = this.playerDroppedSource.asObservable();
  private relevantTeam: Team = new Team();
  private teamList!: Team[];
  private allPlayers: Player[] = [];
  private leastPickedPlayer: Player = {
    name: 'Zinedini Zidane',
    age: 23,
    nacionality: 'France',
    initials: 'ZZ',
  };
  private mostPickedPlayer: Player = {
    name: 'Cristiano Ronaldo',
    age: 24,
    nacionality: 'Portugal',
    initials: 'CR',
  };

  constructor(httpClient: HttpClient) {
    this.teamList = JSON.parse(localStorage.getItem('teamList') || '[]');
    httpClient.get<string>('http://localhost:3000').subscribe((list)=>{
      this.allPlayers = JSON.parse(list);
    })
  }

  public getTeam(): Team {
    return this.relevantTeam;
  }

  public setTeam(team: Team): void {
    this.relevantTeam = team;
  }

  public getTeamList(): Team[] {
    return this.teamList;
  }

  public addTeam(team: Team): void {
    if (this.teamList.indexOf(team) === -1) {
      this.teamList.push(team);
    }
    this.saveState();
  }

  public removeTeam(team: Team): void {
    let idx = this.teamList.indexOf(team);
    if (~idx) {
      this.teamList.splice(idx, 1);
    }
    this.saveState();
  }

  public setAllPlayers(players: Player[]): void {
    this.allPlayers = players;
  }

  public getMostPickedPlayer(): Player {
    return this.mostPickedPlayer;
  }

  public getLeastPickedPlayer(): Player {
    return this.leastPickedPlayer;
  }

  public saveState() {
    localStorage.setItem('teamList', JSON.stringify(this.teamList));
  }

  public getMatchingPlayers(searchTerm: String): Player[] {
    return this.allPlayers.filter(
      (valid) => valid.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
  }

  public announcePlayerDropped(playerName: String) {
    this.playerDroppedSource.next(playerName);
  }

  public getLowestAgeTeams(): Team[] {
    return this.teamList.filter((t)=>t.avgAge !== null)
      .sort((a, b) => (a.avgAge > b.avgAge ? 1 : -1))
      .slice(0, 5);
  }

  public getHighestAgeTeams(): Team[] {
    return this.teamList.filter((t)=>t.avgAge !== null)
      .sort((a, b) => (a.avgAge < b.avgAge ? 1 : -1))
      .slice(0, 5);
  }
}
