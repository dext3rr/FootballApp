using System;
using System.Collections.Generic;

namespace FootballApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }   
        public byte[] PasswordHash { get; set; }  
        public byte[] PasswordSalt { get; set; }
        public string Email { get; set; }
        public DateTime AccountCreationDate { get; set; } 
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<PlayerLike> PlayerLikes { get; set; }
        public ICollection<TeamLike> TeamLikes { get; set; }
    }
}