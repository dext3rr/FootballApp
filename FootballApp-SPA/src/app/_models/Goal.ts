import { Player } from './Player';

export interface Goal {
    id: number;
    minute: number;
    penalty: boolean;
    ownGoal: boolean;
    playerId: number;
    player: Player;
    matchId: number;
}
