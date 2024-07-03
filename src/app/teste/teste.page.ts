import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {
   lista: any = [];

  constructor(public http: HttpClient) { 
    this.escreveDados();
  }

  escreveDados(){
    this.http.get("https://vitrinekta.com.br/ADM-RecCat%28Solicitacao%29/APP/appsolicitacao.php").subscribe(data => {
      this.lista = data;
      //console.log(data);
  } )
}
  

 ngOnInit(): void {
  }

}