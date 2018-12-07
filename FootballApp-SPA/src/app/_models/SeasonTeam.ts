import { Team } from './team';
import { Season } from './Season';

export interface SeasonTeam {
    id: number;
    seasonId: number;
    season: Season;
    teamId: number;
    team: Team;
    matches: number;
    wins: number;
    draws: number;
    losses: number;
    goalsScored: number;
    goalsConceded: number;
    yellowCards: number;
    redCards: number;
    points: number;
}
