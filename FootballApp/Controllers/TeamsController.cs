using System.Linq;
using System.Threading.Tasks;
using FootballApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FootballApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly IFootballRepository _repo;

        public TeamsController(IFootballRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous]
        [HttpGet]

        public async Task<IActionResult> GetTeams()
        {
            var teams = await _repo.GetTeams();

            return Ok(teams);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> getTeam(int id)
        {
            var team = await _repo.GetTeam(id);

            return Ok(team);
        }

        // [AllowAnonymous]
        // [HttpGet("{id}/players/")]
        //  public async Task<IActionResult> getPlayers(int id)
        // {
        //     var players = await _repo.Players.Where(x => x.TeamId == id).ToListAsync();
        //     return Ok(players);
        // }
    }
}