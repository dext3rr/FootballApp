using System.Collections.Generic;

namespace FootballApp.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public int ManagerId { get; set; }
        public Manager Manager { get; set; }
        public string PhotoUrl { get; set; }
        public int LeagueId { get; set; }
        public League League { get; set; }
        public ICollection<Player> Players { get; set; }
    }
}