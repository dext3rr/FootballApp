import { Team } from './team';

export interface Player {
    id: number;
    name: string;
    surname: string;
    dateOfBirth: Date;
    country: string;
    position: string;
    number: number;
    teamId: number;
    team: Team;
    photoUrl: string;
}
