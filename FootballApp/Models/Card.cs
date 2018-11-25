namespace FootballApp.Models
{
    public class Card
    {
        public int Id { get; set; }
        public int Minute { get; set; }
        public string Comment { get; set; }
        public bool IsYellow { get; set; }
        public bool IsRed  { get; set; }
        public int PlayerId { get; set; }
        public Player player { get; set; }
        public int MatchId { get; set; }
    }
}