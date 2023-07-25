import { Component } from '@angular/core';
import { CepService } from '../services/cep.service';
import { Cep } from '../models/cep';

@Component({
  selector: 'app-busca-cep',
  templateUrl: './busca-cep.component.html',
  styleUrls: ['./busca-cep.component.css'],
})
export class BuscaCepComponent {
  cepInput = '';
  endereco: Cep[] = [];
  errorMessage = '';

  constructor(private cepService: CepService) {}

  buscaEndereco() {
    this.errorMessage = '';

    if (this.cepInput.trim() === '') {
      this.errorMessage = 'Campo obrigatório. Digite pelo menos um CEP.';
      return;
    }

    const ceps = this.cepInput.replace(/,/g, ';').split(';').map(cep => cep.trim());
    for (let i = 0; i < ceps.length; i++) {
      if (ceps[i].includes('-')) {
        const cepsComHifen = ceps[i].split('-');
        ceps[i] = cepsComHifen.join('');
      }
    }

    if (this.cepInput.endsWith(';') || this.cepInput.endsWith(',')) {
      this.errorMessage = 'O último CEP não deve terminar com \';\' ou \',\'.';
      return;
    }

    for (const cep of ceps) {
      if (cep.length < 8 ) {
        this.errorMessage = 'Cada CEP deve ter pelo menos 8 dígitos.';
        return;
      }
    }

    this.cepService.getEnderecos(ceps).subscribe(
      (data) => {
        this.endereco = data;
        console.log(data);
      },
      (error) => {
        this.errorMessage = 'Erro ao buscar endereços. Por favor, tente novamente mais tarde';
      }
    );
  }
}
