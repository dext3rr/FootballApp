using FootballApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FootballApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<League> Leagues { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<Season> Seasons { get; set; }
        public DbSet<SeasonTeam> SeasonTeams { get; set; }
        public DbSet<StartingPlayer> StartingPlayers { get; set; }
        public DbSet<Substitution> Substitutions { get; set; }
        public DbSet<MatchDetails> MatchDetails { get; set; }
        public DbSet<PlayersMatchDetails> PlayersMatchDetails { get; set; }
        public DbSet<PlayersSeasonDetails> PlayersSeasonDetails { get; set; }
    }
}