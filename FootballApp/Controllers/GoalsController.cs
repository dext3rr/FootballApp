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
    public class GoalsController : ControllerBase
    {
        private readonly DataContext _context;

          public GoalsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getGoal(int id)
        {
            var goal = await _context.Goals.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(goal);
        }
     

        [HttpGet("matchGoals/{id}")]
           public async Task<IActionResult> getMatchGoals(int id)
        {
            var goals = await _context.Goals
            .Include(p => p.Player)
            .Where(x => x.MatchId == id)
            .OrderBy( m => m.Minute).ToListAsync();
            return Ok(goals);
        }

        [HttpPost("addGoal")]
        public async Task<IActionResult> AddGoal(Goal goal)
        {
            await _context.Goals.AddAsync(goal);
            await _context.SaveChangesAsync();

            return Ok(await _context.Goals.ToListAsync());
        }

        [HttpDelete("{id}/deleteGoal")]
        public async Task<IActionResult> DeleteGoal(int id)
        {
            Goal goal = _context.Goals.Where(x => x.Id == id).Single<Goal>();
            _context.Goals.Remove(goal); 

            await _context.SaveChangesAsync();

            return Ok(await _context.Goals.ToListAsync());
        }
    }
}