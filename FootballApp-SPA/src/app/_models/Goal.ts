import { Player } from './Player';

export interface Goal {
    id: number;
    minute: number;
    isPenalty: boolean;
    isOwnGoal: boolean;
    playerId: number;
    player: Player;
    matchId: number;
}
