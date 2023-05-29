import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../services/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ConsultaCepService
  ) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    if(form.valid){
      this.router.navigate([ './sucesso' ])
    }else{
      alert('Formulário Inválido!!!');
    }
    console.log(form.controls);
  }

  consultaCep(ev: any, f: NgForm) {
    const cep = ev.target.value;
    if(cep != ''){
      this.service.getConsultaCep(cep).subscribe(resultado => {
        console.log(resultado);
        this.completarEndereco(resultado, f);
      })
    }
  }

  completarEndereco(dados: any, f: NgForm) {
    f.form.patchValue({
      endereco: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })
  }
}
