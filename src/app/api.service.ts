import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';

import { Rating } from './rating';
import { Team } from './team';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ApiService {

  private usersUrl = 'api/users';
  private teamsUrl = 'api/teams';
  private ratingsUrl = 'api/ratings';

  userLoggedIn: User;

  private logStatus = new BehaviorSubject(false);
  currentStatus = this.logStatus.asObservable();

  constructor(private http: HttpClient) { }

  changeStatus(status: boolean) {
    this.logStatus.next(status);
  }

  // Users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }

  findUser(username: string): Observable<User> {
    const url = `${this.usersUrl}/?username=${username}`;
    return this.http.get<User>(url);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions)
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, httpOptions);
  }

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user: user.id;
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, httpOptions)
  }

  // Teams
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl);
  }

  getTeam(id: number): Observable<Team> {
    const url = `${this.teamsUrl}/${id}`;
    return this.http.get<Team>(url);
  }

  getTeamByName(name: string): Observable<Team> {
    const url = `${this.teamsUrl}/?name=${name}`;
    return this.http.get<Team>(url);
  }

  updateTeam(team: Team): Observable<any> {
    return this.http.put(this.teamsUrl, team, httpOptions);
  }

  // Ratings

  getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.ratingsUrl);
  }

  getRating(id: number): Observable<Rating> {
    const url = `${this.ratingsUrl}/${id}`;
    return this.http.get<Rating>(url);
  }


  addRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.ratingsUrl, rating, httpOptions)
  }

  updateRating(rating: Rating): Observable<any> {
    return this.http.put(this.ratingsUrl, rating, httpOptions);
  }

  deleteRating(rating: Rating | number): Observable<Rating> {
    const id = typeof rating === 'number' ? rating: rating.id;
    const url = `${this.ratingsUrl}/${id}`;
    return this.http.delete<Rating>(url, httpOptions)
  }





}
