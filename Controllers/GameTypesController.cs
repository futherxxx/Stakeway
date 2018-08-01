using Microsoft.AspNetCore.Mvc;
using stakeway.Api.Models;
using stakeway.Api.Persistences;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace stakeway.Api.Controllers
{
    [Route("api/[controller]")]
    public class GameTypesController : Controller
    {
        private readonly StakewayDbContext context;

        public GameTypesController(StakewayDbContext context)
        {
            this.context = context;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody] GameType[] gameTypes)
        {
            foreach (var obj in gameTypes)
            {
                var gameType = new GameType
                {
                    Type = obj.Type,
                    GameId = obj.GameId
                };
                this.context.GameTypes.Add(gameType);
                this.context.SaveChanges();
            }
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
