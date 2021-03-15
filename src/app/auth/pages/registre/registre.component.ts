import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validators/validaciones';
import { ValidatorService } from '../../../shared/validators/validator.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styles: [
  ]
})
export class RegistreComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [ '', [ Validators.required, Validators.pattern( this.vs.nombreApellidoPattern )]],
      email: [ '', [ Validators.required, Validators.pattern( this.vs.emailPattern ) ], [ this.ev ]],
      username: [ '', [ Validators.required, this.vs.noPuedeSerStrider ]],
      password: [ '', [ Validators.required, Validators.minLength(6) ]],
      password2: [ '', [ Validators.required ]],
    },
    {
      validators: [ this.vs.camposIguales('password', 'password2') ]
    }
  );

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    switch (
      (errors?.required) ? 1 :
      (errors?.pattern) ? 2 :
      (errors?.emailTomado) ? 3 :
      -1
    ) {
      case 1:
        return 'Email es obligatorio.';
      case 2:
        return 'Email no cumple el formato.';
      case 3:
        return 'Email esta tomado.';
      case -1:
        return '';
    }
  }

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private ev: EmailValidatorService
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset(
      {
        nombre: 'Fredy Rivera',
        email: 'test1@test.com',
        username: 'fredy_rivera',
        password: '123456',
        password2: '123456'
      }
    )
  }

  campoNoValido( campo: string ): boolean | undefined{
    return this.miFormulario.get(campo)?.invalid
           && this.miFormulario.get(campo)?.touched;
  }


  submitFormulario(): void{
    console.log( this.miFormulario.value );
    this.miFormulario.markAllAsTouched();
  }

}
