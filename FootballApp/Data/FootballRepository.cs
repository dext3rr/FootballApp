using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FootballApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FootballApp.Data
{
    public class FootballRepository : IFootballRepository
    {
        private readonly DataContext _context;
        public FootballRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }


        public async Task<Player> GetPlayer(int id)
        {
            var player = await _context.Players
            .Include(t => t.Team)
            .FirstOrDefaultAsync(p => p.Id == id);

            return player;
        }

        public async Task<IEnumerable<Player>> GetPlayers()
        {
            var players = await _context.Players.ToListAsync();

            return players;
        }

        public async Task<IEnumerable<Player>> GetTeamPlayers(int teamId)
        {
            var players = await _context.Players.Where(x => x.Team.Id == teamId).ToListAsync();

            return players;
        }


        public async Task AddPlayer(Player player)
        {
            await _context.Players.AddAsync(player);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePlayer(int id)
        {
            {
                Player player = _context.Players.Where(x => x.Id == id).Single<Player>();
                _context.Players.Remove(player);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Team> GetTeam(int id)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(t => t.Id == id);

            return team;
        }

        public async Task<IEnumerable<Team>> GetTeams()
        {
            var teams = await _context.Teams.ToListAsync();

            return teams;
        }

        

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}