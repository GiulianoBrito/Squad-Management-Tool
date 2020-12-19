import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Player } from '../models';
import { TeamService } from '../team.service';

import { PlayerBoxComponent } from './player-box.component';

describe('PlayerBoxComponent', () => {
  let component: PlayerBoxComponent;
  let fixture: ComponentFixture<PlayerBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerBoxComponent],
      providers: [{provide:TeamService, useClass:MockTeamService}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBoxComponent);
    component = fixture.componentInstance;
    component.player = new Player();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockTeamService{
  playerDropped$ = new Subject();
}
