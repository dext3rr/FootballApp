import { Manager } from './Manager';
import { League } from './league';

export interface Team {
    id: number;
    name: string;
    address: string;
    email: string;
    telephone: string;
    managerId: number;
    manager: Manager;
    photoUrl: string;
    leagueId: number;
    league: League;
}
