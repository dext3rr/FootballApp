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
        [HttpGet("seasons/{leagueId}")]

        public async Task<IActionResult> getSeasons(int leagueId)
        {
            var seasons= await _context.Seasons.Where(x => x.LeagueId == leagueId).ToListAsync();
            return Ok(seasons);
        }

        [AllowAnonymous]
        [HttpGet("seasonTeams/{seasonId}")]

        public async Task<IActionResult> getSeasonTeams(int seasonId)
        {
            var seasonTeams = await _context.SeasonTeams.Where(x => x.SeasonId == seasonId).ToListAsync();
            return Ok(seasonTeams);
        }
    }
}