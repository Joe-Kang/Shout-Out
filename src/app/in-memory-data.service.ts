import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const users = [
            {firstname: "Bob", lastname: "Smith", username: "BSmith", password: "hello", rating: []}
        ];
        return {users};
    }
}
