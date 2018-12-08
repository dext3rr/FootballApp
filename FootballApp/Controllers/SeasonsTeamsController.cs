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
    public class SeasonsTeamsController : ControllerBase
    {
        private readonly DataContext _context;

        public SeasonsTeamsController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]

        public async Task<IActionResult> GetAllSeasonsTeams()
        {
            var seasonsTeams = await _context.SeasonTeams
            .Include(s => s.Season)
            .Include(t => t.Team)
            .ToListAsync();
            return Ok(seasonsTeams);
        }

        [AllowAnonymous]
        [HttpGet("season/{seasonId}")]
        public async Task<IActionResult> GetSeasonTeams(int seasonId)
        {
            var seasonTeams = await _context.SeasonTeams
            .Include(s => s.Season)
            .Include(t => t.Team)
            .Where(x => x.SeasonId == seasonId)
            .OrderByDescending(p => p.Points).ToListAsync();
            return Ok(seasonTeams);
        }

        [AllowAnonymous]
        [HttpGet("season/{seasonId}/team/{teamId}")]

        public async Task<IActionResult> GetSeasonTeam(int seasonId, int teamId)
        {
            var seasonTeam = await _context.SeasonTeams
            .Include(s => s.Season)
            .Include(t => t.Team)
            .Where(tid => tid.TeamId == teamId)
            .Where(x => x.SeasonId == seasonId)
            .FirstOrDefaultAsync();
            return Ok(seasonTeam);
        }

        [AllowAnonymous]
        [HttpPost("season/{seasonId}/generateTeams")]

        public async Task<IActionResult> GenerateTeams(int seasonId, Team[] teams)
        {
            foreach (Team team in teams)
            {
                SeasonTeam seasonTeam = new SeasonTeam();
                seasonTeam.SeasonId = seasonId;
                seasonTeam.TeamId = team.Id;
                await _context.SeasonTeams.AddAsync(seasonTeam);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        [AllowAnonymous]
        [HttpDelete("season/{seasonId}/deleteTeams")]

        public async Task<IActionResult> DeleteTeams(int seasonId, Team[] teams)
        {
            foreach (Team team in teams)
            {
                SeasonTeam seasonTeam = _context.SeasonTeams
                .Where(s => s.SeasonId == seasonId)
                .Where(t => t.TeamId == team.Id)
                .Single<SeasonTeam>();
                _context.SeasonTeams.Remove(seasonTeam);

            }
            await _context.SaveChangesAsync();
            return Ok();
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