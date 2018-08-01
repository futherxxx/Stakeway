using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using stakeway.Api.Models;
using stakeway.Api.Persistences;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace stakeway.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly StakewayDbContext _context;

        public UsersController(StakewayDbContext context)
        {
            _context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<IEnumerable<Users>> Get()
        {
            return await _context.Users.ToListAsync();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public async Task Post([FromBody]Users user)
        {
            string[] userId = user.UserId.Split('|');
            user.UserId = userId[1];
            var userInDb = _context.Users.SingleOrDefault(u => u.UserId == userId[1]);
            if (userInDb == null)
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

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
