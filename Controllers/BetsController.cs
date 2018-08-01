using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using stakeway.Api.Controllers.Resources;
using stakeway.Api.Models;
using stakeway.Api.Persistences;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace stakeway.Api.Controllers
{

    [Route("api/[controller]")]
    public class BetsController : Controller
    {
        private readonly StakewayDbContext _context;
        private readonly IMapper _mapper;

        public BetsController(StakewayDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<GameResource> Get()
        {
            var games = _context.Games
              .Include(g => g.Bets)
                .ToList();
            var gameResources = _mapper.Map<List<Game>, List<GameResource>>(games);
            return gameResources;

        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<List<GameResource>> Get(string id)
        {
            string[] userId = id.Split('|');
            id = userId[1];
            //return await _context.Bets.Where(b => b.UserId == id || b.PlayerId == id).ToListAsync();
            var games = await _context.Games.Include(g => g.Bets).ToListAsync();
            var gameResources = _mapper.Map<List<Game>, List<GameResource>>(games);
            return gameResources;
        }

        // POST api/<controller>
        [HttpPost]
        public async Task Post([FromBody]Bet bet)
        {
            string[] playerId = bet.PlayerId.Split('|');
            string[] userId = bet.PlayerId.Split('|');
            bet.PlayerId = playerId[1];
            bet.UserId = userId[1];
            await _context.Bets.AddAsync(bet);
            await _context.SaveChangesAsync();
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
