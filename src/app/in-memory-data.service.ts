import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Team } from './team';
import { Rating } from './rating';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
      const users = [
        {id: 0, firstname: "user1", lastname: "user1", username: "user1", password: "hello", rating: [0,4,8,12,16]},
        {id: 1, firstname: "user2", lastname: "user2", username: "user2", password: "hello", rating: [1,5,9,13,17]},
        {id: 2, firstname: "user3", lastname: "user3", username: "user3", password: "hello", rating: [2,6,10,14,18]},
        {id: 3, firstname: "user4", lastname: "user4", username: "user4", password: "hello", rating: [3,7,11,15,19]},
      ];

      const teams = [
        {id: 0, name: "Product Management", rating: [0,5,10,15], aveHelpful: 3.3, aveResponsive: 2.8, aveFriendly: 4},
        {id: 1, name: "Human Resources", rating: [1,6,11,16], aveHelpful: 3.3, aveResponsive: 2.3, aveFriendly: 3.5},
        {id: 2, name: "Legal", rating: [2,7,12,17], aveHelpful: 3.5, aveResponsive: 3, aveFriendly: 2.5},
        {id: 3, name: "Marketing", rating: [3,8,13,18], aveHelpful: 2.8, aveResponsive: 2.5, aveFriendly: 2.5},
        {id: 4, name: "R&D", rating: [4,9,14,19], aveHelpful: 2, aveResponsive: 1, aveFriendly: 3.5},
        {id: 5, name: "Sales", rating: [], aveHelpful: 0, aveResponsive: 0, aveFriendly: 0},
        {id: 6, name: "Accounting", rating: [], aveHelpful: 0, aveResponsive: 0, aveFriendly: 0},
        {id: 7, name: "Support", rating: [], aveHelpful: 0, aveResponsive: 0, aveFriendly: 0},
        {id: 8, name: "Services", rating: [], aveHelpful: 0, aveResponsive: 0, aveFriendly: 0},
        {id: 9, name: "Engineering", rating: [], aveHelpful: 0, aveResponsive: 0, aveFriendly: 0},
        {id: 10, name: "Training", rating: [], aveHelpful: 0, aveResponsive: 0, aveFriendly: 0},
        {id: 11, name: "Business Development", rating: [], aveHelpful: 0, aveResponsive: 0, aveFriendly: 0},
      ];

      const ratings = [
        {id: 0, user: 0, team: "Product Management", helpful: 3, responsive: 3, friendly: 3},
        {id: 1, user: 1, team: "Human Resources", helpful: 4, responsive: 3, friendly: 2},
        {id: 2, user: 2, team: "Legal", helpful: 5, responsive: 1, friendly: 1},
        {id: 3, user: 3, team: "Marketing", helpful: 5, responsive: 2, friendly: 1},
        {id: 4, user: 0, team: "R&D", helpful: 2, responsive: 1, friendly: 4},
        {id: 5, user: 1, team: "Product Management", helpful: 4, responsive: 3, friendly: 5},
        {id: 6, user: 2, team: "Human Resources", helpful: 3, responsive: 2, friendly: 5},
        {id: 7, user: 3, team: "Legal", helpful: 4, responsive: 3, friendly: 1},
        {id: 8, user: 0, team: "Marketing", helpful: 1, responsive: 1, friendly: 5},
        {id: 9, user: 1, team: "R&D", helpful: 3, responsive: 1, friendly: 1},
        {id: 10, user: 2, team: "Product Management", helpful: 1, responsive: 5, friendly: 5},
        {id: 11, user: 3, team: "Human Resources", helpful: 5, responsive: 3, friendly: 2},
        {id: 12, user: 0, team: "Legal", helpful: 3, responsive: 4, friendly: 3},
        {id: 13, user: 1, team: "Marketing", helpful: 4, responsive: 3, friendly: 1},
        {id: 14, user: 2, team: "R&D", helpful: 1, responsive: 1, friendly: 4},
        {id: 15, user: 3, team: "Product Management", helpful: 5, responsive: 2, friendly: 3},
        {id: 16, user: 0, team: "Human Resources", helpful: 1, responsive: 1, friendly: 5},
        {id: 17, user: 1, team: "Legal", helpful: 2, responsive: 4, friendly: 5},
        {id: 18, user: 2, team: "Marketing", helpful: 1, responsive: 4, friendly: 3},
        {id: 19, user: 3, team: "R&D", helpful: 2, responsive: 1, friendly: 5},
      ]
      return {users, teams, ratings};
    }


    genId(db: any[]): number {
      return db.length > 0 ? Math.max(...db.map(db => db.id)) + 1 : 0;
    }
}
