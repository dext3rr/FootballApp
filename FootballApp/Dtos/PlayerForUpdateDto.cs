using System;

namespace FootballApp.Dtos
{
    public class PlayerForUpdateDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Country { get; set; }
        public string Status { get; set; }
        public int Number { get; set; }
        public int TeamId { get; set; }
    }
}