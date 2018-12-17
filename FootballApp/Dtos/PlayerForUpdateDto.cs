using System;

namespace FootballApp.Dtos
{
    public class PlayerForUpdateDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Country { get; set; }
        public int TeamId { get; set; }
        public int PositionId { get; set; }
    }
}