import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(private router: Router, public http: HttpClient) { }

  formulario: any = {email: '', senha: '', telefone: '', nome: ''};

  ngOnInit() {
  }
lista: any = [];
  cadastro(){
    
   this.http.get("https://vitrinekta.com.br/ADM-RecCat%28Solicitacao%29/APP/cadastro.php?Nome="+this.formulario.Nome+"&CPF="+this.formulario.CPF+"&Email="+this.formulario.Email+"&Celular="+this.formulario.Celular+"&Endereco="+this.formulario.Endereco+"&Bairro="+this.formulario.Bairro+"&Numero="+this.formulario.Numero).subscribe(  data => {
       this.lista =  data;
      if(this.lista[0]=="certo"){
          alert("Cadastro realizado com sucesso. Efetue o login.");
         this.router.navigate(['login']);
       }else{
          alert("Ocorreu um problema ao realizar o cadastro.");
       }
       } )
  
    
  }


}

