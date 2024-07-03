import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';//ALEX------
import { FormsModule } from '@angular/forms';//ALEX NOVO
import { HttpClient, HttpClientModule } from '@angular/common/http';//ALEX--------

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  formulario: any = {CPF: ''};


  constructor(public http: HttpClient,private router: Router) {
    this.gravarUsuario(null)
  }

  async gravarUsuario(CPF: any) {
    //alert(`Gravado!`);
    await Storage.set({
      key: 'CPF',
      value: CPF,
    });
    
  }

  lista: any = [];

  verifica(){
    this.http.get("https://vitrinekta.com.br/ADM-RecCat%28Solicitacao%29/APP/login.php?CPF="+this.formulario.CPF).subscribe(  data => {
       this.lista =  data;
       if(this.lista[0]!=undefined){
        this.gravarUsuario(this.formulario.CPF);
        alert("Login efetuado com sucesso!");
        //this.router.navigate(['home']);
        this.router.navigate(['/tabs/tab1']).then(() => {
        window.location.reload();
        });


       }else{
         alert("Login ou senha inválido");
       }

       } )
  
    
  }

  


  
  
}
