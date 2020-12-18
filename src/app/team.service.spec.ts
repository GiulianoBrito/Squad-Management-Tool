import { TestBed } from '@angular/core/testing';

import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamService);
    service.setAllPlayers([
      {
        name: 'Zinedini Zidane',
        age: 23,
        nacionality: 'France',
        initials: 'ZZ',
      },
      {
        name: 'Cristiano Ronaldo',
        age: 30,
        nacionality: 'Portugal',
        initials: 'CR',
      },
      {
        name: 'Ronaldo da Silva de Souza',
        age: 18,
        nacionality: 'Brazil',
        initials: 'RS',
      },
      {
        name: 'Giuliano Brito',
        age: 24,
        nacionality: 'Brazil',
        initials: 'GB',
      },
      {
        name: 'José Silva',
        age: 20,
        nacionality: 'Brazil',
        initials: 'JS',
      },
      {
        name: 'João Santos',
        age: 23,
        nacionality: 'Brazil',
        initials: 'JS',
      },
      {
        name: 'Mateus Alves',
        age: 26,
        nacionality: 'Brazil',
        initials: 'MA',
      },
    ]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
