using System.Linq;
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

    public class UsersController : ControllerBase
    {
        private readonly IFootballRepository _repo;

        public UsersController(IFootballRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]

        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            return Ok(users);
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            return Ok(user);
        }
    }
}