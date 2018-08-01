using System;
using System.Collections.Generic;

namespace stakeway.Api.Controllers.Resources
{
    public class GameResource
    {
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
        public ICollection<GameTypeResource> GameTypes { get; set; }
        //public GameResource()
        //{
        //    GameTypes = new Collection<GameTypeResource>();
        //}

    }
}
