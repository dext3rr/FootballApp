namespace FootballApp.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BadgeImagePath { get; set; }
        public string Adress { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public int PlayerId { get; set; }
        public int CoachId { get; set; }
        public int GoalsId { get; set; }
        public int CardsId { get; set; }
        public string PhotoUrl { get; set; }
    }
}