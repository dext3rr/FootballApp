import { Team } from './team';
import { Position } from './Position';

export interface Player {
    id: number;
    name: string;
    surname: string;
    dateOfBirth: Date;
    country: string;
    positionId: number;
    position: Position;
    number: number;
    teamId: number;
    team: Team;
    photoUrl: string;
}
