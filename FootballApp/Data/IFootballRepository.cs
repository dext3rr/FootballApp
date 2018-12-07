using System.Collections.Generic;
using System.Threading.Tasks;
using FootballApp.Models;

namespace FootballApp.Data
{
    public interface IFootballRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();

         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
         User GetUserByUsername(string username);
         List<Role> GetUserRoles(int userId);
         Task<IEnumerable<Team>> GetTeams();
         Task<Team> GetTeam(int id);
         Task AddTeam(Team team);
         Task DeleteTeam(int id);
         Task<IEnumerable<Player>> GetPlayers();
         Task<Player> GetPlayer(int id);
         Task<IEnumerable<Player>> GetTeamPlayers(int teamId);
         Task AddPlayer(Player player);
         Task DeletePlayer(int id);


    }
}