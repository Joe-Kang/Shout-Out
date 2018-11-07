import { User } from './user';
import { Team } from './team';

export class Rating {
  id: number;
  user: number;
  team: string;
  helpful: number;
  responsive: number;
  friendly: number;
}
