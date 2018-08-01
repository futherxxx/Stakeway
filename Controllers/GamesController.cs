using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using stakeway.Api.Controllers.Resources;
using stakeway.Api.Models;
using stakeway.Api.Persistences;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace stakeway.Api.Controllers
{
    [Route("api/[controller]")]
    public class GamesController : Controller
    {
        private readonly StakewayDbContext _context;
        private readonly IMapper _mapper;

        public GamesController(StakewayDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        // GET: api/<controller>
        [HttpGet]
        public async Task<IEnumerable<GameResource>> Get()
        {
            var games = await _context.Games.Include(g => g.GameTypes).ToListAsync();
            var gameResources = _mapper.Map<List<Game>, List<GameResource>>(games);
            return gameResources;
        }

        // GET api/<controller>/5
        [HttpGet("{org}")]
        public async Task<IEnumerable<GameResource>> Get(string org)
        {
            var games = await _context.Games.Include(g => g.GameTypes).Where(g => g.GameOrganization == org).ToListAsync();
            var gameResources = _mapper.Map<List<Game>, List<GameResource>>(games);
            return gameResources;
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GameResource gameResource)
        {
            var game = _mapper.Map<GameResource, Game>(gameResource);
            if (game.Id != 0)
            {
                var gameToUpdate = _context.Games.SingleOrDefault(g => g.Id == game.Id);
                gameToUpdate.ModifiedDate = DateTime.UtcNow;
                gameToUpdate.Name = game.Name;
                gameToUpdate.GameOrganization = game.GameOrganization;
                gameToUpdate.StartTime = game.StartTime;
                gameToUpdate.EndTime = game.EndTime;
                gameToUpdate.Min = game.Min;
                gameToUpdate.GameTypes = game.GameTypes;
                gameToUpdate.Max = game.Max;
                //_context.Games.Update(gameToUpdate);
                await TryUpdateModelAsync(gameToUpdate, "",
                    g => g.ModifiedDate,
                    g => g.Name,
                    g => g.GameOrganization,
                    g => g.StartTime,
                    g => g.EndTime,
                    g => g.GameTypes,
                    g => g.Min,
                    g => g.Max);
                await _context.SaveChangesAsync();

            }
            else
            {
                game.CreatedDate = DateTime.UtcNow;
                game.ModifiedDate = DateTime.UtcNow;
                await _context.Games.AddAsync(game);
                _context.SaveChanges();

            }
            return Ok(gameResource);
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
            var game = _context.Games.SingleOrDefault(g => g.Id == id);
            _context.Games.Remove(game);
            _context.SaveChanges();
        }
    }
}
