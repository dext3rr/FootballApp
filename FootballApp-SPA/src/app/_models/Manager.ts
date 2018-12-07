import { Team } from './team';

export interface Manager {
    id: number;
    name: string;
    surname: string;
    dateOfBirth: Date;
    country: string;
    license: string;
    teamId: number;
    team: Team;
    photoUrl: string;
}
