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
    public class ManagersController : ControllerBase
    {
        private readonly IFootballRepository _repo;
        private readonly IMapper _mapper;

        public ManagersController(IFootballRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetManagers()
        {
            var managers = await _repo.GetManagers();

            return Ok(managers);
        }

            [HttpGet("{id}")]
        public async Task<IActionResult> GetManager(int id)
        {
            var manager = await _repo.GetManager(id);

            return Ok(manager);
        }

        [HttpPost("addManager")]
        public async Task<IActionResult> AddManager(Manager manager)
        {
            await _repo.AddManager(manager);

            return StatusCode(201);
        }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> UpdateManager(int id) {

        //     // var playerFromRepo = await _repo.GetPlayer(id);

        //     // _mapper.Map(playerForUpdateDto, playerFromRepo);

        //     // if (await _repo.SaveAll())
        //     //     return NoContent();
            
        //     // throw new Exception($"Nie udało się zaktualizować danych zawodnika o id {id}.");
        // }

        [HttpDelete("{id}/deleteManager")]
        public async Task<IActionResult> DeleteManager(int id){

            await _repo.DeleteManager(id);
            return Ok();
        }

    }

    
}