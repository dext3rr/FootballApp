using FootballApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FootballApp.Data
{
    public class DataContext: DbContext
    {
        public DataContext (DbContextOptions<DataContext> options) : base (options) {}
        public DbSet<Value> Values { get; set; }
    }
}