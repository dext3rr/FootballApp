using System;
using System.Collections.Generic;

namespace FootballApp.Models
{
    public class Match
    {
        public int Id { get; set; }
        public int HomeTeamId { get; set; }
        public Team HomeTeam { get; set; }
        public int AwayTeamId { get; set; }
        public Team AwayTeam { get; set; }
        public DateTime DateOfMatch { get; set; }
        public DateTime TimeOfMatch { get; set; }
        public int HomeGoals { get; set; }
        public int AwayGoals { get; set; }
        public int FixtureId { get; set; }
        public Fixture Fixture { get; set; }
        public bool HasEnded { get; set; }
        public ICollection<Goal> Goals { get; set; }
        public ICollection<Card> Cards { get; set; }
    }
}