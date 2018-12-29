import { User } from './User';
import { Player } from './Player';

export interface PlayerLike {
    userLikerId: number;
    userLiker: User;
    playerLikedId: number;
    playerLiked: Player;
}
