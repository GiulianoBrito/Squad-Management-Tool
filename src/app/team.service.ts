import { Injectable } from '@angular/core';
import { Team } from './models';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private relevantTeam: Team = new Team();
  private teamList!: Team[];
  constructor() {
    this.teamList = JSON.parse(localStorage.getItem('teamList') || '[]');
   }

  public getTeam() :Team {
    debugger;
    return this.relevantTeam;
  }

  public setTeam(team: Team) : void{
    this.relevantTeam = team;
    debugger;
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

  public saveState(){
    localStorage.setItem('teamList',JSON.stringify(this.teamList));
  }
}
