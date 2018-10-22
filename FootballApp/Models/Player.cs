using System;

namespace FootballApp.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Country { get; set; }
        public string Status { get; set; }
        public int Number { get; set; }
        public int MinutesPlayed { get; set; }
    }
}