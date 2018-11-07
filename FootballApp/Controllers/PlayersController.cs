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
        private readonly DataContext _context;

        public PlayersController(DataContext context)
        {
            _context = context;
        }
        
        [AllowAnonymous]
        [HttpGet]

           public async Task<IActionResult> getPlayers()
        {
            var players = await _context.Players.ToListAsync();
            return Ok(players);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> getPlayer(int id)
        {
            var player = await _context.Players.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(player);
        }

        [AllowAnonymous]
        [HttpGet("team/{playerId}")]
        public async Task<IActionResult> getTeamPlayers(int playerId)
        {
            var players = await _context.Players.Where(x => x.TeamId == playerId).ToListAsync();
            return Ok(players);
        }
    }
}