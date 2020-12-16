import { Injectable } from '@angular/core';
import { Team } from './models';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private relevantTeam: Team = new Team();
  private teamList!: Team[];
  private leastPickedPlayer: Player = {
    "name":"Zinedini Zidane",
    "age":23,
    "initials": "ZZ",
    "nacionality":"France"
  };
  private mostPickedPlayer: Player= {
    "name":"Zinedini Zidane",
    "age":23,
    "initials": "ZZ",
    "nacionality":"France"
  };

  constructor() {
    this.teamList = JSON.parse(localStorage.getItem('teamList') || '[]');
   }

  public getTeam() :Team {
    return this.relevantTeam;
  }

  public setTeam(team: Team) : void{
    this.relevantTeam = team;
  }

  public getTeamList(): Team[]{
    return this.teamList;
  }
  
  public addTeam(team: Team) : void{
    if(this.teamList.indexOf(team) === -1){
      this.teamList.push(team);
      this.saveState();
    } 
  }

  public removeTeam(team: Team): void{
    let idx = this.teamList.indexOf(team);
    if(~idx){
      this.teamList.splice(idx,1);
    }
    this.saveState();
  }

  getMostPickedPlayer():Player{
    return this.mostPickedPlayer;
  }

  getLeastPickedPlayer():Player{
    return this.leastPickedPlayer;
  }

  public saveState(){
    localStorage.setItem('teamList',JSON.stringify(this.teamList));
  }
}
