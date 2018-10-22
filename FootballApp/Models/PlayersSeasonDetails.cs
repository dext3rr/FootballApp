namespace FootballApp.Models
{
    public class PlayersSeasonDetails
    {
        public int Id { get; set; }
        public int OverallMinutesPlayed { get; set; }
        public int OverallGoalsScored { get; set; }
        public int YellowCardsAmmount { get; set; }
        public int RedCardsAmmount { get; set; }
        public int PlayerId { get; set; }
        public int SeasonId { get; set; }
    }
}