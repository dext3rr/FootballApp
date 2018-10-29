namespace FootballApp.Models
{
    public class Card
    {
        public int Id { get; set; }
        public int Minute { get; set; }
        public bool IsRed  { get; set; }
        public int PlayerId { get; set; }
        public int MatchId { get; set; }
    }
}