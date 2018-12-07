namespace FootballApp.Models
{
    public class Fixture
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int SeasonId { get; set; }
        public Season Season { get; set; }
    }
}