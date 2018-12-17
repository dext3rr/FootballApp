using System.Linq;
using System.Threading.Tasks;
using FootballApp.Data;
using FootballApp.Dtos;
using FootballApp.Models;
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

        // public async Task<IActionResult> getSeasonTeams(int seasonId)
        // {
        //     var seasonTeams = await _context.SeasonTeams.Where(x => x.SeasonId == seasonId).ToListAsync();
        //     return Ok(seasonTeams);
        // }

         public async Task<IActionResult> getSeasonTeams(int seasonId)
        {
            var seasonTeams = await _context.SeasonTeams
            .Include(t => t.Team)
            .Where(x => x.SeasonId == seasonId)
            .OrderByDescending(p => p.Points)
            .ToListAsync();
            return Ok(seasonTeams);
        }

        [AllowAnonymous]
        [HttpGet("season/{seasonId}/team/{teamId}")]

          public async Task<IActionResult> getSeasonTeam(int seasonId, int teamId)
        {
            var seasonTeam = await _context.SeasonTeams
            .Include(t => t.Team)
            .Where(tid => tid.TeamId == teamId)
            .Where(x => x.SeasonId == seasonId)
            .FirstOrDefaultAsync();
            return Ok(seasonTeam);
        }

        [HttpPut("team/{seasonTeamId}")]
        public async Task<IActionResult> updateSeasonTeam(int seasonTeamId, SeasonTeam seasonTeam) {

            var seasonTeamToUpdate = _context.SeasonTeams.Find(seasonTeamId);

            if (seasonTeam == null){
                return NotFound();
            }
            seasonTeamToUpdate.Matches = seasonTeam.Matches;
            seasonTeamToUpdate.Wins = seasonTeam.Wins;
            seasonTeamToUpdate.Draws = seasonTeam.Draws;
            seasonTeamToUpdate.Losses = seasonTeam.Losses;
            seasonTeamToUpdate.GoalsScored = seasonTeam.GoalsScored;
            seasonTeamToUpdate.GoalsConceded = seasonTeam.GoalsConceded;
            seasonTeamToUpdate.YellowCards = seasonTeam.YellowCards;
            seasonTeamToUpdate.RedCards = seasonTeam.RedCards;
            seasonTeamToUpdate.Points = seasonTeam.Points;

            _context.SeasonTeams.Update(seasonTeamToUpdate);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}