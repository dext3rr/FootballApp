using System.Linq;
using System.Threading.Tasks;
using FootballApp.Data;
using FootballApp.Models;
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
        [HttpGet("league/{leagueId}")]

        public async Task<IActionResult> GetLeagueTeams(int leagueId)
        {
            var teams = await _repo.GetLeagueTeams(leagueId);

            return Ok(teams);
        }



        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> getTeam(int id)
        {
            var team = await _repo.GetTeam(id);

            return Ok(team);
        }

        [AllowAnonymous]
        [HttpGet("{teamId}/players/")]
        public async Task<IActionResult> GetTeamPlayers(int teamId)
        {
            var players = await _repo.GetTeamPlayers(teamId);

            return Ok(players);
        }

        [AllowAnonymous]
        [HttpPost("addTeam")]
        public async Task<IActionResult> AddTeam(Team team)
        {
            await _repo.AddTeam(team);

            return StatusCode(201);
        }

        [HttpDelete("{id}/deleteTeam")]
        public async Task<IActionResult> DeleteTeam(int id){

            await _repo.DeleteTeam(id);
            return Ok();
        }
    }
}