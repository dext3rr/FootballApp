import { League } from './league';

export interface Season {
    id: number;
    year: string;
    hasTeams: boolean;
    leagueId: number;
    league: League;
}
