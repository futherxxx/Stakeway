using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace stakeway.Api.Models
{
    public class Game
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Min { get; set; }
        public string Max { get; set; }
        public string GameOrganization { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public IEnumerable<Bet> Bets { get; set; }
        public List<GameType> GameTypes { get; set; }
        public Game()
        {
            GameTypes = new List<GameType>();
        }

    }
}
