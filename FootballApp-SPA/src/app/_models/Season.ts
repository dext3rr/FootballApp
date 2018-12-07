import { League } from './league';

export interface Season {
    id: number;
    year: string;
    leagueId: number;
    league: League;
}
