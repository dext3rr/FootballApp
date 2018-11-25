import { Player } from './Player';

export interface Card {
    id: number;
    minute: number;
    comment: string;
    isYellow: boolean;
    isRed: boolean;
    player: Player;
    matchId: number;
}
