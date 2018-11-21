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
    public class FixturesController : ControllerBase
    {
         private readonly DataContext _context;

          public FixturesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> getSeasonFixtures(int id)
        {
            var seasonFixtures = await _context.Fixtures.Where(x => x.SeasonId == id).ToListAsync();
            return Ok(seasonFixtures);
        }

        [HttpGet("details/{id}")]

         public async Task<IActionResult> getFixture(int id)
        {
            var seasonFixture = await _context.Fixtures.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(seasonFixture);
        }

        [HttpPost("addFixture")]
        public async Task<IActionResult> AddFixture(Fixture fixture)
        {
            await _context.Fixtures.AddAsync(fixture);
            await _context.SaveChangesAsync();

            return Ok(await _context.Fixtures.ToListAsync());
        }

        [HttpDelete("{id}/deleteFixture")]
        public async Task<IActionResult> DeleteFixture(int id)
        {
            Fixture fixture = _context.Fixtures.Where(x => x.Id == id).Single<Fixture>();
            _context.Fixtures.Remove(fixture); 

            await _context.SaveChangesAsync();

            return Ok(await _context.Fixtures.ToListAsync());
        }
    }
}