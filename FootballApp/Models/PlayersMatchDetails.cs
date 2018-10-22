namespace FootballApp.Models
{
    public class PlayersMatchDetails
    {
        public int Id { get; set; }
        public int StartMinute { get; set; }
        public int EndMinute { get; set; }
        public int GoalsScored { get; set; }
        public int YellowCard { get; set; }
        public int RedCard { get; set; }
        public int PlayerId { get; set; }
        public int MatchId { get; set; }
    }
}