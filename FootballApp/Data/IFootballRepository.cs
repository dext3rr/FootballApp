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
         Task<IEnumerable<Team>> GetTeams();
         Task<Team> GetTeam(int id);
         Task<IEnumerable<Player>> GetPlayers();
         Task<Player> GetPlayer(int id);
         Task<IEnumerable<Player>> GetTeamPlayers(int teamId);


    }
}