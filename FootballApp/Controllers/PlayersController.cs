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
    public class PlayersController : ControllerBase
    {
        private readonly IFootballRepository _repo;
         private readonly IMapper _mapper;

        public PlayersController(IFootballRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;

        }
        
        [HttpGet]

           public async Task<IActionResult> GetPlayers()
        {
            var players = await _repo.GetPlayers();

            return Ok(players);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlayer(int id)
        {
            var player = await _repo.GetPlayer(id);

            return Ok(player);
        }

        [HttpGet("teams/{playerId}")]
        public async Task<IActionResult> GetTeamPlayers(int playerId)
        {
            var players = await _repo.GetTeamPlayers(playerId);
            return Ok(players);
        }

        [AllowAnonymous]
        [HttpPost("addPlayer")]
        public async Task<IActionResult> AddPlayer(Player player)
        {
            await _repo.AddPlayer(player);

            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlayer(int id, PlayerForUpdateDto playerForUpdateDto) {

            var playerFromRepo = await _repo.GetPlayer(id);

            _mapper.Map(playerForUpdateDto, playerFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Nie udało się zaktualizować danych zawodnika o id {id}.");
        }

        [HttpDelete("{id}/deletePlayer")]
        public async Task<IActionResult> DeletePlayer(int id){

            await _repo.DeletePlayer(id);
            return Ok();
        }
    }
}