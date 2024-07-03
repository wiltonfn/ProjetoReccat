import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { format, parseISO } from 'date-fns';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
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

  constructor(public http: HttpClient) {
    this.getCpf().then(() => this.escreveDados());
  }

  ngOnInit(): void {}

  escreveDados() {
    this.http
      .get(
        `https://vitrinekta.com.br/ADM-RecCat%28Solicitacao%29/APP/appsolicitacao.php?CPF=${this.cpf}`
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
