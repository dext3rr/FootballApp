namespace FootballApp.Models
{
    public class StartingPlayer
    {
        public int Id { get; set; }
        public int MatchId { get; set; }
        public int TeamId { get; set; }
        public int PlayerId { get; set; }
        public bool IsGoalKeeper { get; set; }
        public bool IsCaptain { get; set; }
    }
}