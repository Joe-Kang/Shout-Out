import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Team } from './team';
import { Rating } from './rating';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
      const users = [
        {id: 0, firstname: "user1", lastname: "user1", username: "user1", password: "hello", rating: [0]},
        {id: 2, firstname: "user2", lastname: "user2", username: "user2", password: "hello", rating: [1]},
        {id: 3, firstname: "user3", lastname: "user3", username: "user3", password: "hello", rating: [2]},
        {id: 4, firstname: "user4", lastname: "user4", username: "user4", password: "hello", rating: []},
      ];

      const teams = [
        {id: 0, name: "ngWeb", rating: [0]},
        {id: 1, name: "HR", rating: [1]},
        {id: 2, name: "IT", rating: [2]}
      ];

      const ratings = [
        {id: 0, user: 0, team: 0, helpful: 10, responsive: 10, friendly: 10},
        {id: 1, user: 1, team: 1, helpful: 10, responsive: 10, friendly: 10},
        {id: 2, user: 2, team: 2, helpful: 10, responsive: 10, friendly: 10},
        {id: 3, user: 3, team: 0, helpful: 10, responsive: 10, friendly: 10}
      ]
      return {users, teams, ratings};
    }


    genId(db): number {
      return db.length > 0 ? Math.max(...db.map(db => db.id)) + 1 : 0;
    }
}
