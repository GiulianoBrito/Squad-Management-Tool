import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from '../models/player';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-player-box',
  templateUrl: './player-box.component.html',
  styleUrls: ['./player-box.component.scss'],
})
export class PlayerBoxComponent implements OnInit {
  @Input()
  public player!: Player;

  @Output()
  public playerAdded = new EventEmitter<Player>();
  
  subscription: Subscription;

  constructor(teamService: TeamService) {
    this.subscription = teamService.playerAdded$.subscribe(playerName => {
      if(this.player.name === playerName){
        this.addPlayer();
      }
    })
  }

  ngOnInit(): void {}

  addPlayer(): void {
    if (this.player.isAvailable) {
      this.playerAdded.emit(this.player);
      this.player.isAvailable = false;
    }
  }
}
