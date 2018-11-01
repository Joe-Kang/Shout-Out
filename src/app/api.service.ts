import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Rating } from './rating';
import { Team } from './team';
import { User } from './user';

@Injectable({ providedIn: 'root' })

export class ApiService {

  constructor(private _http: HttpClient) { }





}
