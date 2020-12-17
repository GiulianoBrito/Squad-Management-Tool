import { Component, OnInit } from '@angular/core';
import {
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Team } from '../models';
import { Player } from '../models/player';
import { TeamService } from '../team.service';
import { FORMATIONS } from './formation.config';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss'],
})
export class TeamEditComponent implements OnInit {
  public team!: Team;
  public currentTag: String = '';
  public availablePlayers!: Player[];
  public searchTerm: String = '';
  public formations = FORMATIONS;
  public formationKey: string = '3-2-2-3';
  public keyList: string[];
  public currentFormation = this.formations[this.formationKey];

  constructor(private router: Router, private teamService: TeamService, private dragulaService: DragulaService) {   
  }

  ngOnInit(): void {
    this.dragulaService.createGroup('COPYABLE', {
      copy: (el, source) => {        
        return (source.id === 'source' && !el.classList.contains('disabled'));        
      },
      copyItem: (player:Player) => {
        this.teamService.announcePlayerAdded(player.name);
        return player},
      accepts: (el, target, source, sibling) => {
        // To avoid dragging to source container
        return target.id !== 'source';
      },
      revertOnSpill: true,
      moves: (el, target, source, sibling) => {
        return !(el.classList.contains('disabled') || source.id === "target");}
    }); 
    this.team = this.teamService.getTeam();
    this.searchPlayers();
    this.keyList = Object.keys(this.formations);
  }

  ngOnDestroy():void{
    this.dragulaService.destroy('COPYABLE');
  } 


  onSubmit(teamForm: NgForm): void {
    if (!teamForm.form.valid) {
      teamForm.form.markAllAsTouched();
      return;
    }
    this.calcAvgAge();
    this.teamService.addTeam(this.team);
    this.router.navigate(['/']);
  }

  addTag(event: KeyboardEvent): void {
    event.stopPropagation();
    if (event.key === ';' || event.key === 'Enter') {
      this.currentTag = this.currentTag.replace(';', '');
      if (this.currentTag !== '' && (this.team.tags.includes(this.currentTag) === false)) {
        this.team.tags.push(this.currentTag);
      }
      this.currentTag = '';
    }
  }

  removeTag(tag: String): void {
    this.team.tags.splice(this.team.tags.indexOf(tag), 1);
  }

  searchPlayers() : void{
    this.availablePlayers = this.teamService.getMatchingPlayers(this.searchTerm);
    this.availablePlayers.forEach(p => p.isAvailable = (this.team.players.find((pl)=> p.name === pl.name) === undefined));
  }

  addPlayer(player: Player):void{
    this.team.players.push(player);
  }

  calcAvgAge():void{
    var ageSum: number = 0;
    this.team.players.forEach((p)=> ageSum += p.age);    
    this.team.avgAge = ageSum/this.team.players.length;    
  }

  updateFormation(){
    this.currentFormation = this.formations[this.formationKey];
    this.team.players.forEach((p)=> p.isAvailable = true);
    this.team.players = [];
  }

}