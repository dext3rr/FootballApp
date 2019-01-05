import { League } from './league';
import { SeasonStatus } from './SeasonStatus';

export interface Season {
    id: number;
    year: string;
    seasonStatusId: number;
    seasonStatus: SeasonStatus;
    hasTeams: boolean;
    leagueId: number;
    league: League;
}
