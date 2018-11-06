import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Team } from './team';
import { Rating } from './rating';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
      const users = [
        {id: 0, firstname: "user1", lastname: "user1", username: "user1", password: "hello", rating: [0]},
        {id: 1, firstname: "user2", lastname: "user2", username: "user2", password: "hello", rating: [1]},
        {id: 2, firstname: "user3", lastname: "user3", username: "user3", password: "hello", rating: [2]},
        {id: 3, firstname: "user4", lastname: "user4", username: "user4", password: "hello", rating: [0, 1, 2, 3]},
      ];

      const teams = [
        {id: 0, name: "team0", rating: [0, 3]},
        {id: 1, name: "team1", rating: [0, 3]},
        {id: 2, name: "team2", rating: [1]},
        {id: 3, name: "team3", rating: [2]},
        {id: 4, name: "team4", rating: [0, 3]},
        {id: 5, name: "team5", rating: [1]},
        {id: 6, name: "team6", rating: [2]},
        {id: 7, name: "team7", rating: [0, 3]},
        {id: 8, name: "team8", rating: [1]},
        {id: 9, name: "team9", rating: [2]},
        {id: 10, name: "team10", rating: [0, 3]},
        {id: 11, name: "team11", rating: [1]},
        {id: 12, name: "team12", rating: [2]},
        {id: 13, name: "team13", rating: [0, 3]},
        {id: 14, name: "team14", rating: [1]},
        {id: 15, name: "team15", rating: [2]},
        {id: 16, name: "team16", rating: [0, 3]},
        {id: 17, name: "team17", rating: [1]},
        {id: 18, name: "team18", rating: [2]},
        {id: 19, name: "team19", rating: [0, 3]},
        {id: 20, name: "team20", rating: [1]},
        {id: 21, name: "team21", rating: [2]},
        {id: 22, name: "team22", rating: [0, 3]},
        {id: 23, name: "team23", rating: [1]},
        {id: 24, name: "team24", rating: [2]},
      ];

      const ratings = [
        {id: 0, user: 0, team: "team0", helpful: 10, responsive: 10, friendly: 10},
        {id: 1, user: 1, team: "team1", helpful: 10, responsive: 10, friendly: 10},
        {id: 2, user: 2, team: "team2", helpful: 10, responsive: 10, friendly: 10},
        {id: 3, user: 3, team: "team3", helpful: 10, responsive: 10, friendly: 10}
      ]
      return {users, teams, ratings};
    }


    genId(db: any[]): number {
      return db.length > 0 ? Math.max(...db.map(db => db.id)) + 1 : 0;
    }
}
