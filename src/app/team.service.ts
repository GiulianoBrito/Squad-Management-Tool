import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Team } from './models';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private playerAddedSource = new Subject<String>();
  playerAdded$ = this.playerAddedSource.asObservable();
  private relevantTeam: Team = new Team();
  private teamList!: Team[];
  private allPlayers: Player[] =[{
    "name":"Zinedini Zidane",
    "age":23,    
    "nacionality":"France",
    "initials": "ZZ"
  },{
    "name":"Cristiano Ronaldo",
    "age":30,
    "nacionality":"Portugal",
    "initials": "CR"
  },{
    "name":"Ronaldo da Silva de Souza",
    "age":18,
    "nacionality":"Brazil",
    "initials": "RS"  
  }]
  private leastPickedPlayer: Player = {
    "name":"Zinedini Zidane",
    "age":23,
    "nacionality":"France",
    "initials": "ZZ"
  };
  private mostPickedPlayer: Player= {
    "name":"Cristiano Ronaldo",
    "age":24,
    "nacionality":"Portugal",
    "initials": "CR"
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
    }  
    this.saveState();
  }

  public removeTeam(team: Team): void{
    let idx = this.teamList.indexOf(team);
    if(~idx){
      this.teamList.splice(idx,1);
    }
    this.saveState();
  }

  public getAllPlayers():Player[]{
    return this.allPlayers;
  }

  public getMostPickedPlayer():Player{
    return this.mostPickedPlayer;
  }

  public getLeastPickedPlayer():Player{
    return this.leastPickedPlayer;
  }

  public saveState(){
    localStorage.setItem('teamList',JSON.stringify(this.teamList));
  }

  public getMatchingPlayers(searchTerm:String):Player[]{
    return this.allPlayers.filter(valid => valid.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
  }

  public announcePlayerAdded(playerName: String){
    this.playerAddedSource.next(playerName);
  }

  public getLowestAgeTeams():Team[]{
    return this.teamList.sort((a,b)=> (a.avgAge > b.avgAge)? 1 :-1).slice(0,5);
  }

  public getHighestAgeTeams():Team[]{
    return this.teamList.sort((a,b)=> (a.avgAge < b.avgAge)? 1 :-1).slice(0,5);
  }

}
