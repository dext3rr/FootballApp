namespace FootballApp.Models
{
    public class Goal
    {
        public int Id { get; set; }
        public int Minute { get; set; }
        public bool Penalty { get; set; }
        public bool OwnGoal { get; set; }
        public int PlayerId { get; set; }
        public int MatchId { get; set; }

    }
}