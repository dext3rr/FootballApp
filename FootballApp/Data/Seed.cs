using System.Collections.Generic;
using System.Linq;
using FootballApp.Models;
using Newtonsoft.Json;

namespace FootballApp.Data
{
    public class Seed
    {
        private readonly DataContext _context;

        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedData()
        {

            var roles = new List<Role>
            {
                new Role{Name = "Użytkownik"},
                new Role{Name = "Moderator"},
                new Role{Name = "Administrator"}
            };

            foreach (var role in roles)
            {
                _context.Roles.AddAsync(role).Wait();
                _context.SaveChanges();
            }

            var positions = new List<Position>
            {
                new Position{Name = "Bramkarz"},
                new Position{Name = "Obrońca"},
                new Position{Name = "Pomocnik"},
                new Position{Name = "Napastnik"}
            };

            foreach (var position in positions)
            {
                _context.Positions.AddAsync(position).Wait();
                _context.SaveChanges();
            }

            Area area = new Area
            {
                Name = "OZPN Kalisz"
            };
            _context.Areas.Add(area);

            var leagues = new List<League>
            {
                new League{Name = "Klasa A", AreaId = 1},
                new League{Name = "Klasa B", AreaId = 1}
            };

            foreach (var league in leagues)
            {
                _context.Leagues.AddAsync(league).Wait();
                _context.SaveChanges();
            }

            User admin = new User
            {
                Username = "admin"
            };
            byte[] adminPasswordHash, adminPasswordSalt;
            GeneratePasswordHash("admin", out adminPasswordHash, out adminPasswordSalt);

            admin.PasswordHash = adminPasswordHash;
            admin.PasswordSalt = adminPasswordSalt;
            admin.Username = admin.Username.ToLower();
            _context.Users.AddAsync(admin).Wait();

            var roleAdmin = _context.Roles.FirstOrDefault(r => r.Name == "Administrator");
            var userRoleAdmin = new UserRole { User = admin, Role = roleAdmin };
            _context.UserRoles.AddAsync(userRoleAdmin).Wait();

            var teamsData = System.IO.File.ReadAllText("Data/DataToSeed/Teams.json");
            var teams = JsonConvert.DeserializeObject<List<Team>>(teamsData);
            foreach (var team in teams)
            {
                _context.Teams.Add(team);
            }

             _context.SaveChanges();

            var playersData = System.IO.File.ReadAllText("Data/DataToSeed/Players.json");
            var players = JsonConvert.DeserializeObject<List<Player>>(playersData);
            foreach (var player in players)
            {
                _context.Players.Add(player);
            }

             _context.SaveChanges();

            var managersData = System.IO.File.ReadAllText("Data/DataToSeed/Managers.json");
            var managers = JsonConvert.DeserializeObject<List<Manager>>(managersData);
            foreach (var manager in managers)
            {
                _context.Managers.Add(manager);
            }

             _context.SaveChanges();
           
        }

        private void GeneratePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}