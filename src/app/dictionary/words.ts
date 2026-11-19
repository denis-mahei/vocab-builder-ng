import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WordsParams, WordsResponse, WordStatisticsResponse } from '../models';
import { Observable } from 'rxjs';

@Service()
export class Words {
  private http = inject(HttpClient);

  fetchOwnWords(params: WordsParams): Observable<WordsResponse> {
    return this.http.get<WordsResponse>(
      environment.apiUrl + '/words/own', {
      params,
    });
  }

  fetchCategories(): Observable<string[]> {
    return this.http.get<string[]>(
      environment.apiUrl + '/words/categories');
  }

  fetchStatistics(): Observable<WordStatisticsResponse> {
    return this.http.get<WordStatisticsResponse>(
      environment.apiUrl + '/words/statistics',
    );
  }
}
