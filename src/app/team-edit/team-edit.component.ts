import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
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
  public droppedPlayer: Player[] = [];
  public searchTerm: String = '';
  public formations = FORMATIONS;
  public keyList: string[];
  public currentFormation;
  originIcon = faGlobe;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private dragulaService: DragulaService
  ) {}

  ngOnInit(): void {
    this.dragulaService.createGroup('COPYABLE', {
      copy: (el, source) => {
        return source.id === 'source' && !el.classList.contains('disabled');
      },
      copyItem: (player: Player) => {
        this.teamService.announcePlayerDropped(player.name);
        return player;
      },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging to source container
        return target.id !== 'source';
      },
      revertOnSpill: true,
      moves: (el, target, source, sibling) => {
        return !(el.classList.contains('disabled') || source.classList.contains('player-existente'));
      },
    });
    this.team = this.teamService.getTeam();
    this.searchPlayers();
    this.keyList = Object.keys(this.formations);
    this.currentFormation = this.formations[this.team.formation];
  }

  ngOnDestroy(): void {
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

  updatePlayer(index: number) {
    setTimeout(() => {
      if (this.droppedPlayer.length > 0) {
        this.team.players[index] = this.droppedPlayer.pop();
      }
    }, 50);
  }

  addTag(event: KeyboardEvent): void {
    event.stopPropagation();
    if (event.key === ';' || event.key === 'Enter') {
      this.currentTag = this.currentTag.replace(';', '');
      if (
        this.currentTag !== '' &&
        this.team.tags.includes(this.currentTag) === false
      ) {
        this.team.tags.push(this.currentTag);
      }
      this.currentTag = '';
    }
  }

  removeTag(tag: String): void {
    this.team.tags.splice(this.team.tags.indexOf(tag), 1);
  }

  searchPlayers(): void {
    this.availablePlayers = this.teamService.getMatchingPlayers(
      this.searchTerm
    );
    console.log(this.availablePlayers);
    console.log(this.team.players);
    this.availablePlayers.forEach(
      (p) =>
        (p.isAvailable =
          (this.team.players.filter((pla)=>pla!==null).find((pl)=>pl.name === p.name)===undefined)
    ));
  }

  addPlayer(player: Player): void {
    this.team.players.push(player);
  }

  calcAvgAge(): void {
    var ageSum: number = 0;
    var playerCount: number = 0;
    this.team.players.forEach((p) => {
      if(p!== null){
        ageSum += p.age
        playerCount++;
      }
    });
    this.team.avgAge = ageSum / playerCount;
  }

  updateFormation() {
    this.currentFormation = this.formations[this.team.formation];
    this.team.players.forEach((p) => (p.isAvailable = true));
    this.team.players = [];
  }
}
