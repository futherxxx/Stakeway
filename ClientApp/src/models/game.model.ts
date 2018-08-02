import { Bet } from './bet';
export interface Game{
  id:number;
  name:string;
  startTime:string;
  endTime:string;
  min:string;
  gameOrganization:string,
  max:string;
  gameSelected:boolean;
  createdBy:string;
  createdDate:Date;
  modifiedBy:string;
  modifiedDate:Date;
  gameExpired:boolean;
  bets:Bet[];
  gameTypes:GameTypes[];
  gameTypess:string[];
  
}
  export class GameTypes{
    id:number;
    type:string;
    // gameId:number;
  }