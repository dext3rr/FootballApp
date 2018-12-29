using System;
using System.Collections.Generic;

namespace FootballApp.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Country { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        public int? TeamId { get; set; }
        public Team Team { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PlayerLike> LikedUsers { get; set; }
    }
}