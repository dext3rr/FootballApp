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
            var leagues = await _context.Leagues
            .Include(a => a.Area)
            .ToListAsync();
            return Ok(leagues);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> getLeague(int id)
        {
            var league = await _context.Leagues
            .Include(a => a.Area)
            .FirstOrDefaultAsync(x => x.Id == id);
            return Ok(league);
        }

        [AllowAnonymous]
        [HttpGet("arealeagues/{id}")]
        public async Task<IActionResult> getAreaLeagues(int id)
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

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditLeague(int id, League league)
        {
            var leagueToUpdate = _context.Leagues.Find(id);

            if (league == null) {
                return NotFound();
            }

            leagueToUpdate.Name = league.Name;
            leagueToUpdate.AreaId = league.AreaId;
            _context.Leagues.Update(leagueToUpdate);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}/deleteLeague")]
        public async Task<IActionResult> DeleteLeague(int id)
        {
            League league = _context.Leagues.Where(x => x.Id == id).Single<League>();
            _context.Leagues.Remove(league); 

            await _context.SaveChangesAsync();

            return Ok(await _context.Leagues.ToListAsync());
        }
    }
}