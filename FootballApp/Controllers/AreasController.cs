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
    public class AreasController : ControllerBase
    {
        private readonly DataContext _context;

        public AreasController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]

        public async Task<IActionResult> getAreas()
        {
            var areas = await _context.Areas.ToListAsync();
            return Ok(areas);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> getArea(int id)
        {
            var area = await _context.Areas.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(area);
        }
    }
}