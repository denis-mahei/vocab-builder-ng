import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WordsParams, WordsResponse } from '../models';
import { Observable } from 'rxjs';

@Service()
export class Words {
  private http = inject(HttpClient);

  fetchOwnWords(params: WordsParams): Observable<WordsResponse> {
    return this.http.get<WordsResponse>(environment.apiUrl + '/words/own', {
      params,
    });
  }
}
