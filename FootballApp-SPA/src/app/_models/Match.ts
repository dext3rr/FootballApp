import { Team } from './team';

export interface Match {
    id: number;
    homeTeamId: number;
    homeTeam: Team;
    awayTeamId: number;
    awayTeam: Team;
    dateOfMatch: Date;
    hasEnded: boolean;
    homeGoals: number;
    awayGoals: number;
    fixtureId: number;
}
