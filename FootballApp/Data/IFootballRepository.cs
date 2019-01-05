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
         Task<IEnumerable<Team>> GetLeagueTeams(int leagueId);
         Task<Team> GetTeam(int id);
         Task AddTeam(Team team);
         Task DeleteTeam(int id);
         Task<IEnumerable<Manager>> GetManagers();
         Task<Manager> GetManager(int id);
         Task AddManager(Manager manager);
         Task DeleteManager(int id);
         Task<IEnumerable<Player>> GetPlayers();
         Task<Player> GetPlayer(int id);
         Task<IEnumerable<Player>> GetTeamPlayers(int teamId);
         Task AddPlayer(Player player);
         Task DeletePlayer(int id);
         Task<IEnumerable<Position>> GetPositions();
         Task<PlayerLike> GetPlayerLike(int userId, int playerId);
         Task<TeamLike> GetTeamLike(int userId, int teamId);
         Task<IEnumerable<PlayerLike>> GetUserLikedPlayers(int userId);
         Task<IEnumerable<TeamLike>> GetUserLikedTeams(int userId);
    }
}