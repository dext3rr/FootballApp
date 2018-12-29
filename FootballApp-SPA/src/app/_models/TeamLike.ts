import { User } from './User';
import { Team } from './team';

export interface TeamLike {
    userLikerId: number;
    userLiker: User;
    teamLikedId: number;
    teamLiked: Team;
}
