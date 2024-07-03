import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Storage } from '@capacitor/storage';

import { format, parseISO } from 'date-fns';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  lista: any = [];
  cpf: any;

  getCpf = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { value } = await Storage.get({ key: 'CPF' });
        this.cpf = value;

        resolve(value);
      } catch (e) {
        reject(e);
      }
    });
  };

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit(): void {}

  constructor(public http: HttpClient) {
    this.getCpf().then(() => this.escreveDados());
  }

  escreveDados() {
    this.http
      .get(
        `https://vitrinekta.com.br/ADM-RecCat%28Solicitacao%29/APP/appsolicitacao2.php?CPF=${this.cpf}`
      )
      .subscribe((data: any[]) => {
        this.lista = data.map((item: any) => {
          return {
            tipomaterial: item.tipomaterial,
            quantidade: item.quantidade,
            descricao: item.descricao,
            retirada: item.retirada,
            data: this.formatDate(item.data),
            codigocliente: item.codigocliente,
            status: item.status,
            codigosolicitacao: item.codigosolicitacao,
          };
        });
      });
  }

  formatDate(data: string): string {
    const parsedDate = parseISO(data);
    return format(parsedDate, 'dd/MM/yyyy');
  }
}
