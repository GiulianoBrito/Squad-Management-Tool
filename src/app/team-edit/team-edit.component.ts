import { stringify } from '@angular/compiler/src/util';
import { Component, Directive, OnInit } from '@angular/core';
import {
  AbstractControl,
  NgForm,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.team = this.teamService.getTeam();
    this.team.players.push(new Player());
    this.availablePlayers = this.teamService.getMatchingPlayers("");
  }

  onSubmit(teamForm: NgForm): void {
    if (!teamForm.form.valid) {
      teamForm.form.markAllAsTouched();
      return;
    }
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
      console.log(this.team.tags);
    }
  }

  removeTag(tag: String): void {
    this.team.tags.splice(this.team.tags.indexOf(tag), 1);
  }

  searchPlayers() : void{
    this.availablePlayers = this.teamService.getMatchingPlayers(this.searchTerm);
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
