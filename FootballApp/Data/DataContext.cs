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
        public DbSet<Manager> Managers { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<League> Leagues { get; set; }
        public DbSet<Fixture> Fixtures { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<Season> Seasons { get; set; }
        public DbSet<SeasonTeam> SeasonTeams { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<SeasonStatus> SeasonStatuses { get; set; }
        public DbSet<PlayerLike> PlayerLikes { get; set; }
        public DbSet<TeamLike> TeamLikes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

                userRole.HasOne(ur => ur.User)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
            });

            modelBuilder.Entity<Team>()
            .HasOne(m => m.Manager)
            .WithOne(t => t.Team)
            .HasForeignKey<Manager>(mFK => mFK.TeamId)
            .OnDelete(DeleteBehavior.SetNull);

             modelBuilder.Entity<Player>()
            .HasOne(p => p.Team)
            .WithMany(p => p.Players)
            .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<PlayerLike>()
                .HasKey(pl => new {pl.UserLikerId, pl.PlayerLikedId});

            modelBuilder.Entity<PlayerLike>()
                .HasOne(u => u.PlayerLiked)
                .WithMany(u => u.LikedUsers)
                .HasForeignKey(u => u.PlayerLikedId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TeamLike>()
                .HasKey(tl => new {tl.UserLikerId, tl.TeamLikedId});

            modelBuilder.Entity<TeamLike>()
                .HasOne(u => u.TeamLiked)
                .WithMany(u => u.LikedUsers)
                .HasForeignKey(u => u.TeamLikedId)
                .OnDelete(DeleteBehavior.Restrict);


          

            // modelBuilder.Entity<Manager>()
            // .HasOne(t => t.Team)
            // .WithOne(m => m.Manager)
            // .HasForeignKey<Team>(tFK => tFK.ManagerId);
        }
    }
}