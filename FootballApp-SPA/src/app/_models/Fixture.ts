import { Season } from './Season';

export interface Fixture {
    id: number;
    number: number;
    seasonId: number;
    season: Season;
}
