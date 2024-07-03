import { Component } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  lista: any = [];

  formulario: any = {tipomaterial: '', quantidade: '', descricao:'', retirada:''};

  constructor(public http: HttpClient, public NavCtrl: NavController) { 
    
  }

  escreveDados() {
    if (!this.formulario.tipomaterial) {
      alert('Preencha o tipo do material');
    } else if (!this.formulario.quantidade) {
      alert('Insira a quantidade');
    } else if (!this.formulario.descricao) {
      alert('Insira a Descrição');
    } else if (!this.formulario.retirada) {
      alert('Insira o horário da retirada');
    } else {
      this.http.get("https://vitrinekta.com.br/ADM-RecCat%28Solicitacao%29/APP/inserir2app.php?codigocliente=2&tipomaterial=" + this.formulario.tipomaterial + "&quantidade=" + this.formulario.quantidade + "&descricao=" + this.formulario.descricao + "&retirada=" + this.formulario.retirada + "&data=daada&status=Solicitado").subscribe(data => {
        this.lista = data;
        console.log(data);
  
        this.NavCtrl.navigateRoot('tabs/tab1').then(() => {
          window.location.reload();
        });
      });
    }
  }
  
}