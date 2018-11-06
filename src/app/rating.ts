import { User } from './user';
import { Team } from './team';

export class Rating {
  id: number;
  user: User["id"];
  team: Team["name"];
  helpful: number;
  responsive: number;
  friendly: number;
}
