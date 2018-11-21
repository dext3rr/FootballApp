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

        [AllowAnonymous]
        [HttpPost("addArea")]
        public async Task<IActionResult> AddArea(Area area)
        {
            await _context.Areas.AddAsync(area);
            await _context.SaveChangesAsync();

            return Ok(await _context.Areas.ToListAsync());
        }

        [HttpDelete("{id}/deleteArea")]
        public async Task<IActionResult> DeleteArea(int id)
        {
            Area area = _context.Areas.Where(x => x.Id == id).Single<Area>();
            _context.Areas.Remove(area); 

            // var leagues = await _context.Leagues.Where(x => x.AreaId == id).ToListAsync();

            // foreach(var league in leagues){
            //     league.AreaId = 0;
            // }


            await _context.SaveChangesAsync();

            return Ok(await _context.Areas.ToListAsync());
        }
    }
}