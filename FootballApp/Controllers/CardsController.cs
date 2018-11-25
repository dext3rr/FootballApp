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
    public class CardsController : ControllerBase
    {

        private readonly DataContext _context;

        public CardsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getCard(int id)
        {
            var card = await _context.Cards.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(card);
        }

        [HttpGet("{id}/matchCards")]
        public async Task<IActionResult> getMatchCards(int id)
        {
            var cards = await _context.Cards
            .Include(p => p.player)
            .ThenInclude(t => t.team)
            .Where(x => x.MatchId == id)
            .OrderBy(m => m.Minute).ToListAsync();
            return Ok(cards);
        }

        [HttpPost("addCard")]
        public async Task<IActionResult> AddCard(Card card)
        {
            await _context.Cards.AddAsync(card);
            await _context.SaveChangesAsync();

            return Ok(await _context.Cards.ToListAsync());
        }

        [HttpDelete("{id}/deleteCard")]
        public async Task<IActionResult> DeleteCard(int id)
        {
            Card card = _context.Cards.Where(x => x.Id == id).Single<Card>();
            _context.Cards.Remove(card);

            await _context.SaveChangesAsync();

            return Ok(await _context.Cards.ToListAsync());
        }
    }
}
