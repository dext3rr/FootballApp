using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
    public class MatchesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MatchesController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> getFixtureMatches(int id)
        {
            var fixtureMatches = await _context.Matches
            .Include(home => home.HomeTeam)
            .Include(away => away.AwayTeam)
            .Where(x => x.FixtureId == id).ToListAsync();
            return Ok(fixtureMatches);
        }

        [HttpGet("{id}/details")]

        public async Task<IActionResult> getMatch(int id)
        {
            var match = await _context.Matches
            .Include(home => home.HomeTeam)
            .Include(away => away.AwayTeam)
            .Include(fixture => fixture.Fixture)
            .FirstOrDefaultAsync(x => x.Id == id);
            return Ok(match);
        }

        [HttpPost("addMatch")]
        public async Task<IActionResult> AddMatch(Match match)
        {
            await _context.Matches.AddAsync(match);
            await _context.SaveChangesAsync();

            return Ok(await _context.Matches.ToListAsync());
        }

        [HttpDelete("{id}/deleteMatch")]
        public async Task<IActionResult> DeleteMatch(int id)
        {
            Match match = _context.Matches.Where(x => x.Id == id).Single<Match>();
            _context.Matches.Remove(match); 

            await _context.SaveChangesAsync();

            return Ok(await _context.Matches.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMatch(int id, Match match) {

            var matchToUpdate = _context.Matches.Find(id);

            if (match == null){
                return NotFound();
            }

            matchToUpdate.HomeGoals = match.HomeGoals;
            matchToUpdate.AwayGoals = match.AwayGoals;
            matchToUpdate.HasEnded = match.HasEnded;

            _context.Matches.Update(matchToUpdate);
            await _context.SaveChangesAsync();

            return Ok();

            // var matchToUpdate = await getMatch(id);

            // _mapper.Map(match, matchToUpdate);

            // await _context.SaveChangesAsync();

            // return Ok(await _context.Matches.ToListAsync());
            
            // //throw new Exception($"Nie udało się zaktualizować danych zawodnika o id {id}.");
        }

    }
}