import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../models/player';

@Component({
  selector: 'app-player-box',
  templateUrl: './player-box.component.html',
  styleUrls: ['./player-box.component.scss']
})
export class PlayerBoxComponent implements OnInit {

  @Input()
  public player!: Player;

  constructor() { }

  ngOnInit(): void {
  }

}
