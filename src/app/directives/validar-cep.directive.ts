import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ConsultaCepService } from '../services/consulta-cep.service';

@Directive({
  selector: '[validadorCep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidarCEPDirective,
    multi: true
  }]
})
export class ValidarCEPDirective implements AsyncValidator{

  constructor(
    private service: ConsultaCepService
  ) { }
  validate(control: AbstractControl):
    Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      const cep = control.value;
      return this.service.getConsultaCep(cep).pipe(map(
        (resultado: any) => resultado.erro ? {'validatorCep' : true} : null
      ))
  }
}
