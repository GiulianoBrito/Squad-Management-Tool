import { Component, Directive, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  NgForm,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Team } from '../models';
import { Player } from '../models/player';
import { TeamService } from '../team.service';

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

  constructor(private router: Router, private teamService: TeamService,private dragulaService: DragulaService) { 
  dragulaService.createGroup('COPYABLE', {
      copy: (el, source) => {        
        return (source.id === 'source' && !el.classList.contains('disabled'));        
      },
      copyItem: (player:Player) => {
        teamService.announcePlayerAdded(player.name);
        return player},
      accepts: (el, target, source, sibling) => {
        // To avoid dragging to source container
        return target.id !== 'source';
      },
      revertOnSpill: true,
      moves: (el, target, source, sibling) => {return !el.classList.contains('disabled');}
    });
  }

  ngOnInit(): void { 
    this.team = this.teamService.getTeam();
    this.searchPlayers();
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
    this.availablePlayers.forEach(p => p.isAvailable = !this.team.players.includes(p));
  }

  addPlayer(player: Player):void{
    this.team.players.push(player);
  }

  calcAvgAge():void{
    var ageSum: number = 0;
    this.team.players.forEach((p)=> ageSum += p.age);    
    this.team.avgAge = ageSum/this.team.players.length;    
  }
}

@Directive({
  selector: '[urlValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UrlValidatorDirective,
      multi: true,
    },
  ],
})
export class UrlValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    let matcher = (control.value as String).match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    );
    if (!matcher) {
      return {
        url: true,
      };
    } else {
      return null;
    }
  }
}