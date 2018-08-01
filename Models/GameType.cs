namespace stakeway.Api.Models
{
    public class GameType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public Game Game { get; set; }
        public int GameId { get; set; }
    }
}
