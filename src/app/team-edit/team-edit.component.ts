import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Team} from '../models'
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit {
  public team!: Team;

  constructor(private router: Router,private teamService: TeamService) {
   }

  ngOnInit(): void {
    this.team = this.teamService.getTeam();
  }
  
  saveTeam(){
    if(this.team.name!=='' && this.team.website !== ''){      
      this.teamService.addTeam(this.team);
      this.router.navigate(['/']);
    }
  }

}
