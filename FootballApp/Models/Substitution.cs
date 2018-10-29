namespace FootballApp.Models
{
    public class Substitution
    {
        public int Id { get; set; }
        public int MatchId { get; set; }
        public int PlayerOutId { get; set; }
        public int PlayerInId { get; set; }
        public int Minute { get; set; }
    }
}