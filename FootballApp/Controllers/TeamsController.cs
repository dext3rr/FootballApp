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
    public class TeamsController : ControllerBase
    {
        private readonly DataContext _context;

        public TeamsController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]

        public async Task<IActionResult> getTeams()
        {
            var teams = await _context.Teams.ToListAsync();
            return Ok(teams);
        }

        public async Task<IActionResult> getTeam(int id)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(team);
        }
    }
}