import { Team } from './team';
import { Player } from './Player';

export interface Goal {
    id: number;
    minute: number;
    penalty: boolean;
    ownGoal: boolean;
    teamId: number;
    team: Team;
    playerId: number;
    player: Player;
    matchId: number;
}
