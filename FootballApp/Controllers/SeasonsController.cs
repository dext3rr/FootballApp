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
    public class SeasonsController : ControllerBase
    {
        private readonly DataContext _context;

        public SeasonsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> getSeasons()
        {
            var seasons = await _context.Seasons
            .Include(st => st.SeasonStatus)
            .Include(l => l.League)
            .ToListAsync();
            return Ok(seasons);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getSeason(int id)
        {
            var season = await _context.Seasons
            .Include(st => st.SeasonStatus)
            .Include(l => l.League)
            .FirstOrDefaultAsync(x => x.Id == id);
            return Ok(season);
        }

        [HttpGet("league/{leagueId}")]

        public async Task<IActionResult> getLeagueSeasons(int leagueId)
        {
            var seasons= await _context.Seasons
            .Include(st => st.SeasonStatus)
            .Include(l => l.League)
            .Where(x => x.LeagueId == leagueId).ToListAsync();
            return Ok(seasons);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("addSeason")]
        public async Task<IActionResult> AddSeason(Season season)
        {
            season.SeasonStatusId = 1;
            await _context.Seasons.AddAsync(season);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditSeason(int id, Season season)
        {
            var seasonToUpdate = _context.Seasons.Find(id);

            if (season == null) {
                return NotFound();
            }

            seasonToUpdate.Year = season.Year;
            seasonToUpdate.SeasonStatusId = season.SeasonStatusId;
            seasonToUpdate.LeagueId = season.LeagueId;
            _context.Seasons.Update(seasonToUpdate);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}/deleteSeason")]
        public async Task<IActionResult> DeleteSeason(int id)
        {
            Season season = _context.Seasons.Where(x => x.Id == id).Single<Season>();
            _context.Seasons.Remove(season); 

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}