using System;

namespace FootballApp.Dtos
{
    public class UserForListDto
    {
         public int Id { get; set; }
        public string Username { get; set; }   
        public string Email { get; set; }
        public DateTime AccountCreationDate { get; set; } 
        public string PhotoURL { get; set; }
    }
}