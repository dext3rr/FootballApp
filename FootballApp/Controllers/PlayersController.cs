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
    public class PlayersController : ControllerBase
    {
        private readonly IFootballRepository _repo;

        public PlayersController(IFootballRepository repo)
        {
            _repo = repo;
        }
        
        [AllowAnonymous]
        [HttpGet]

           public async Task<IActionResult> GetPlayers()
        {
            var players = await _repo.GetPlayers();

            return Ok(players);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlayer(int id)
        {
            var player = await _repo.GetPlayer(id);

            return Ok(player);
        }

        // [AllowAnonymous]
        // [HttpGet("team/{playerId}")]
        // public async Task<IActionResult> getTeamPlayers(int playerId)
        // {
        //     var players = await _context.Players.Where(x => x.TeamId == playerId).ToListAsync();
        //     return Ok(players);
        // }


    }
}