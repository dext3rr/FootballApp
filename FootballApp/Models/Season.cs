namespace FootballApp.Models
{
    public class Season
    {
        public int Id { get; set; }
        public string Year { get; set; }
        public bool HasTeams { get; set; }
        public int LeagueId { get; set; }
        public League League { get; set; }
    }
}