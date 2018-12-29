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
    public class TeamsController : ControllerBase
    {
        private readonly IFootballRepository _repo;
        private readonly IMapper _mapper;

        public TeamsController(IFootballRepository repo, IMapper mapper)
        {
            _repo = repo;
             _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]

        public async Task<IActionResult> GetTeams()
        {
            var teams = await _repo.GetTeams();

            return Ok(teams);
        }

        [AllowAnonymous]
        [HttpGet("league/{leagueId}")]

        public async Task<IActionResult> GetLeagueTeams(int leagueId)
        {
            var teams = await _repo.GetLeagueTeams(leagueId);

            return Ok(teams);
        }



        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> getTeam(int id)
        {
            var team = await _repo.GetTeam(id);

            return Ok(team);
        }

        [AllowAnonymous]
        [HttpGet("{teamId}/players/")]
        public async Task<IActionResult> GetTeamPlayers(int teamId)
        {
            var players = await _repo.GetTeamPlayers(teamId);

            return Ok(players);
        }

        [AllowAnonymous]
        [HttpPost("addTeam")]
        public async Task<IActionResult> AddTeam(Team team)
        {
            await _repo.AddTeam(team);

            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeam(int id, TeamForUpdateDto teamForUpdateDto) {

            var teamFromRepo = await _repo.GetTeam(id);

            _mapper.Map(teamForUpdateDto, teamFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Nie udało się zaktualizować danych drużyny o id {id}.");
        }

        [HttpDelete("{id}/deleteTeam")]
        public async Task<IActionResult> DeleteTeam(int id){

            await _repo.DeleteTeam(id);
            return Ok();
        }
    }
}