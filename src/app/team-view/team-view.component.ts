import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../models';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss'],
})
export class TeamViewComponent implements OnInit {
  public teamList!: Team[];
  private isSortedNameAsc: boolean = false;
  private isSortedDescriptionAsc: boolean = false;
  constructor(private router: Router, private teamService: TeamService) {
    this.teamList = teamService.getTeamList();
  }

  ngOnInit(): void {}

  newTeam(): void {
    this.teamService.setTeam(new Team());
    this.router.navigate(['/edit']);
  }

  sortName(): void {
    if (!this.isSortedNameAsc) {
      this.teamList.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.isSortedNameAsc = true;
      this.isSortedDescriptionAsc = false;
    }else{
      this.teamList.sort((a, b) => (a.name < b.name ? 1 : -1));
      this.isSortedNameAsc = false;      
      this.isSortedDescriptionAsc = false;
    }
  }

  sortDescription(): void {
    if (!this.isSortedDescriptionAsc) {
      this.teamList.sort((a, b) => (a.description > b.description ? 1 : -1));
      this.isSortedDescriptionAsc = true;
      this.isSortedNameAsc = false;
    }else{
      this.teamList.sort((a, b) => (a.description < b.description ? 1 : -1));
      this.isSortedDescriptionAsc = false;
      this.isSortedNameAsc = false;
    }
  }

  removeTeam(team: Team){    
    this.teamService.removeTeam(team);
  }
}
