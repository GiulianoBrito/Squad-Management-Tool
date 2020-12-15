import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../models';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-box',
  templateUrl: './team-box.component.html',
  styleUrls: ['./team-box.component.scss']
})
export class TeamBoxComponent implements OnInit {
  
  @Input()
  public team!: Team;

  @Output()
  public teamRemoved = new EventEmitter<Team>();
  constructor(private router: Router, private teamService: TeamService) { }

  ngOnInit(): void {
  }

  removeTeam(): void {
    this.teamRemoved.emit(this.team);
  }

  editTeam(): void{
    this.teamService.setTeam(this.team)
    this.router.navigate(['/edit']);
  }

}
