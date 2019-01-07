using System.Collections.Generic;
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

    public class UsersController : ControllerBase
    {
        private readonly IFootballRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IFootballRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]

        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForListDto>(user);

            return Ok(userToReturn);
        }

        [HttpPost("{id}/playerLike/{playerId}")]
        public async Task<IActionResult> LikePlayer(int id, int playerId)
        {
            var playerLike = await _repo.GetPlayerLike(id, playerId);

            if (playerLike != null)
                return BadRequest("Dodałeś już tego zawodnika do ulubionych");

            if (await _repo.GetPlayer(playerId) == null)
                return NotFound();

            playerLike = new PlayerLike
            {
                UserLikerId = id,
                PlayerLikedId = playerId
            };

            _repo.Add<PlayerLike>(playerLike);

            if (await _repo.SaveAll())
                return Ok(201);

            return BadRequest("Nie udało się dodać zawodnika do ulubionych");
        }

        [HttpPost("{id}/teamLike/{teamId}")]
        public async Task<IActionResult> LikeTeam(int id, int teamId)
        {
            var teamLike = await _repo.GetTeamLike(id, teamId);

            if (teamLike != null)
                return BadRequest("Dodałeś już tę drużynę do ulubionych");

            if (await _repo.GetTeam(teamId) == null)
                return NotFound();

            teamLike = new TeamLike
            {
                UserLikerId = id,
                TeamLikedId = teamId
            };

            _repo.Add<TeamLike>(teamLike);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Nie udało się dodać drużyny do ulubionych");
        }

        [HttpGet("{id}/likedPlayers")]
        public async Task<IActionResult> GetUserLikedPlayers(int id)
        {
               var likedPlayers = await _repo.GetUserLikedPlayers(id);
               return Ok(likedPlayers);
        }

        [HttpGet("{id}/likedTeams")]
        public async Task<IActionResult> GetUserLikedTeams(int id)
        {
               var likedTeams = await _repo.GetUserLikedTeams(id);
               return Ok(likedTeams);
        }
    }
}