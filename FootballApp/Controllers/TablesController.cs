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
    public class TablesController : ControllerBase
    {
        private readonly DataContext _context;

        public TablesController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]

        public async Task<IActionResult> getLeagueTeams(int leagueId)
        {
            var leagueTeams = await _context.Teams.ToListAsync();
            return Ok(leagueTeams);
        }
    }
}