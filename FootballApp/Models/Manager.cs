using System;

namespace FootballApp.Models
{
    public class Manager
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Country { get; set; }
        public string License { get; set; }
        public int TeamId { get; set; }
        public Team Team { get; set; }
        public string PhotoUrl { get; set; }
    
    }
}