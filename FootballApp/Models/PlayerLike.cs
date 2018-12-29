namespace FootballApp.Models
{
    public class PlayerLike
    {
        public int UserLikerId { get; set; }
        public User UserLiker { get; set; }
        public int PlayerLikedId { get; set; }
        public Player PlayerLiked { get; set; }
    }
}