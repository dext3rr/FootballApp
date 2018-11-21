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
    public class LeaguesController : ControllerBase
    {
        private readonly DataContext _context;

        public LeaguesController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]

        public async Task<IActionResult> getLeagues()
        {
            var leagues = await _context.Leagues.ToListAsync();
            return Ok(leagues);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> getLeague(int id)
        {
            var league = await _context.Leagues.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(league);
        }

        [AllowAnonymous]
        [HttpGet("arealeagues/{id}")]
        public async Task<IActionResult> AreaLeagues(int id)
        {
            var areaLeagues = await _context.Leagues.Where(x => x.AreaId == id).ToListAsync();
            return Ok(areaLeagues);
        }

        [AllowAnonymous]
        [HttpPost("addLeague")]
        public async Task<IActionResult> AddLeague(League league)
        {
            await _context.Leagues.AddAsync(league);
            await _context.SaveChangesAsync();

            return Ok(await _context.Leagues.ToListAsync());
        }
    }
}