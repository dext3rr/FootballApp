using System;

namespace FootballApp.Models
{
    public class Match
    {
        public int Id { get; set; }
        public int HomeTeamId { get; set; }
        public int AwayTeamId { get; set; }
        public DateTime DateOfMatch { get; set; }
        public bool HasEnded { get; set; }
        public int HomeGoals { get; set; }
        public int AwayGoals { get; set; }
        public int SeasonId { get; set; }


    }
}