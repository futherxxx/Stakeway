using Microsoft.EntityFrameworkCore;
using stakeway.Api.Models;

namespace stakeway.Api.Persistences
{
    public class StakewayDbContext : DbContext
    {
        public StakewayDbContext(DbContextOptions<StakewayDbContext> options) : base(options)
        {
        }
        public DbSet<Game> Games { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Bet> Bets { get; set; }
        public DbSet<GameType> GameTypes { get; set; }
        public DbSet<Type> Types { get; set; }
    }
}