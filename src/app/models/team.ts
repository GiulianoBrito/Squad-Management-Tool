import { Player } from "./player";

export class Team{
    public name: string = '';
    public website: string = '';
    public description: string = '';
    public isReal?: boolean;
    public tags: String[] = [];
    public players: Player[] = [];
    public avgAge?: number;
    public formation: string = '4-4-2';
}