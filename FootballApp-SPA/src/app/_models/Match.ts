import { Team } from './team';
import { Fixture } from './Fixture';

export interface Match {
    id: number;
    homeTeamId: number;
    homeTeam: Team;
    awayTeamId: number;
    awayTeam: Team;
    dateOfMatch: Date;
    timeOfMatch: Date;
    homeGoals: number;
    awayGoals: number;
    fixtureId: number;
    fixture: Fixture;
    hasEnded: boolean;
}
