import { Bet } from "../classes/bet.class";
export class GAME {
  agent_id: any;
  player_id: any;
  game: GAMEPLAY;
  constructor() {
    this.agent_id = 0;
    this.player_id = 0;
    this.game = new GAMEPLAY();
  }
}
export class GAMEPLAY {
  player_id: any;
  game_id: any;
  game_name: any;
  game_date: any;
  game_start_time: any;
  game_end_time: any;
  game_max_bet: any;
  game_min_bet: any;
  bets: Bet[];
  /*constructor() {
    this.player_id = "";
    this.game_id = "";
    this.game_name = "";
    this.game_date = "";
    this.game_start_time = "";
    this.game_end_time = "";
    this.game_max_bet = "";
    this.game_min_bet = "";
    this.bets = [];
  }*/
}
