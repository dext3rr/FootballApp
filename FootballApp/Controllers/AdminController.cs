using System.Threading.Tasks;
using FootballApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using FootballApp.Dtos;
using FootballApp.Models;

namespace FootballApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IFootballRepository _repo;

        public AdminController(DataContext context, IFootballRepository repo)
        {
            _context = context;
            _repo = repo;
        }

        [Authorize(Policy = "RequireAdmin")]
        [HttpGet("userRoles")]
        public async Task<IActionResult> GetUsersRoles()
        {
            var userList = await (from user in _context.Users
                                  orderby user.Username
                                  select new
                                  {
                                      Id = user.Id,
                                      Username = user.Username,
                                      AccountCreationDate = user.AccountCreationDate,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList()
        })
        .OrderBy(x => x.Id)
        .ToListAsync();

        return Ok(userList);
        }

        [Authorize(Policy = "RequireAdmin")]
        [HttpDelete("users/{id}/deleteUser")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            User user = _context.Users.Where(x => x.Id == id).Single<User>();
            _context.Users.Remove(user); 

            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Policy = "RequireAdmin")]
        [HttpPost("editRoles/{username}")]
        public async Task<IActionResult> EditRoles(string username, RoleEditDto roleEditDto)
        {
            var user = _repo.GetUserByUsername(username);
            var userRoles = _repo.GetUserRoles(user.Id);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string [] {};

            foreach(var role in selectedRoles)
            {
                var r = _context.Roles.FirstOrDefault(x => x.Name == role);

                  var check = _context.UserRoles
                  .FirstOrDefault(x => x.UserId == user.Id && x.RoleId == r.Id);

                if (check == null)
                {
                    var ur = new UserRole { User = user, Role = r };
                    _context.UserRoles.AddAsync(ur).Wait();
                    _context.SaveChangesAsync().Wait();
                }
            }

            foreach(var role in  userRoles)
            {
                var r = _context.Roles.FirstOrDefault(x => x.Name == role.Name);

                var check = _context.UserRoles
                .FirstOrDefault(x => x.UserId == user.Id && x.RoleId == r.Id);

                if(check != null && !selectedRoles.Contains(role.Name))
                {
                _context.UserRoles.Remove(check);
                    _context.SaveChangesAsync().Wait();
                }
            }
            return Ok(userRoles);
        }
    }
}