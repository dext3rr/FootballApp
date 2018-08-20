using System.ComponentModel.DataAnnotations;

namespace FootballApp.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }    

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Hasło musi mieć przynajmniej 4 znaki")]
        public string Password { get; set; }
    }
}