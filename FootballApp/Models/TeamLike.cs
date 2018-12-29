namespace FootballApp.Models
{
    public class TeamLike
    {
        public int UserLikerId { get; set; }
        public User UserLiker { get; set; }
        public int TeamLikedId { get; set; }
        public Team TeamLiked { get; set; }
    }
}