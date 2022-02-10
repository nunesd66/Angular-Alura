import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PhotoDTO } from './photoDTO';

const API = 'http://localhost:3000'

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(private http: HttpClient) {}

  listFromUser(userName: string) {
    return this.http
      .get<PhotoDTO[]>(API + '/' + userName + '/photos');
  }

  listFromUserPaginated(userName: string, page: number) {
    const httpParams = new HttpParams().append('page', page);

    return this.http
      .get<PhotoDTO[]>(API + '/' + userName + '/photos', { params: httpParams});
  }

}