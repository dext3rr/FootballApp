namespace FootballApp.Models
{
    public class SeasonTeam
    {
        public int Id { get; set; }
        public string TeamName { get; set; }
        public int Matches { get; set; }
        public int Wins { get; set; }
        public int Draws { get; set; }
        public int Losses { get; set; }
        public int GoalsScored { get; set; }
        public int GoalsConceded { get; set; }
        public int Points { get; set; }
        public int SeasonId { get; set; }
    }
}