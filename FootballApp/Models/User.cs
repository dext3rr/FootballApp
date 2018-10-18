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
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime AccountCreationDate { get; set; }
        public ICollection<ProfilePic> ProfiePic { get; set; }

        
    }
}