import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Cep } from '../models/cep';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  getEnderecos(ceps: string[]): Observable<Cep[]> {
    const requests = ceps.map(cep => this.http.get<Cep>('https://viacep.com.br/ws/' + cep + '/json/'));
    return forkJoin(requests);
  }
}
