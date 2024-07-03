import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  formulario: any = [];
  nome: string;
  email: string;
  celular: string;
  endereco: string;
  bairro: string;
  numero: string;
  dadosAtuais: any;

  constructor(
    public http: HttpClient,
    private modalController: ModalController,
    private router: Router,
    private navCtrl: NavController
  ) {}
  
  ngOnInit() {
    this.getObject();
  }

  async getObject() {
    const { value } = await Storage.get({ key: 'CPF' });
    if (value) {
      this.dados(value);
    }
  }

  dados(cpf: string) {
    const url = `https://vitrinekta.com.br/ADM-RecCat%28Solicitacao%29/APP/jsonperfil.php?CPF=${cpf}`;
    this.http.get(url).subscribe((data: any) => {
      if (data && data.length > 0) {
        const dadosAtuais = data[0];
        this.nome = dadosAtuais.Nome;
        this.email = dadosAtuais.Email;
        this.celular = dadosAtuais.Celular;
        this.endereco = dadosAtuais.Endereco;
        this.bairro = dadosAtuais.Bairro;
        this.numero = dadosAtuais.Numero;
        this.formulario = data.map((item: any) => {
          return {
            Nome: item.Nome,
            CPF: item.CPF,
            Email: item.Email,
            Celular: item.Celular,
            Endereco: item.Endereco,
            Bairro: item.Bairro,
            Numero: item.Numero,
          };
        });
      }
    });
  }
  

  sair() {
    Storage.remove({ key: 'CPF' }).then(() => {
      this.router.navigate(['/login']);
    });
  }

  confirm() {
    const cpf = this.formulario[0].CPF;
    const url = `https://vitrinekta.com.br/ADM-RecCat%28Solicitacao%29/APP/alterarjson.php?CPF=${cpf}&Nome=${this.nome}&Email=${this.email}&Celular=${this.celular}&Endereco=${this.endereco}&Bairro=${this.bairro}&Numero=${this.numero}`;
    this.http.get(url).subscribe(response => {
      console.log(response);
      this.modalController.dismiss();
      this.navCtrl.navigateRoot('/tab5'); 
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

