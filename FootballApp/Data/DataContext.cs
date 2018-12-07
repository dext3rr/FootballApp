using FootballApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FootballApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<League> Leagues { get; set; }
        public DbSet<Fixture> Fixtures { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<Season> Seasons { get; set; }
        public DbSet<SeasonTeam> SeasonTeams { get; set; }

    }
}