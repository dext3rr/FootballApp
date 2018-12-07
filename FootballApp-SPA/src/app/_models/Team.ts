import { Manager } from './Manager';
import { League } from './league';

export interface Team {
    id: number;
    name: string;
    adress: string;
    email: string;
    telephone: string;
    managerId: number;
    manager: Manager;
    photoUrl: string;
    leagueId: number;
    league: League;
}
