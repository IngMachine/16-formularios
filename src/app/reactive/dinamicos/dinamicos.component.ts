import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group(
    {
      nombre: [ , [Validators.required, Validators.minLength(3)]],
      favoritos: this.formBuilder.array([
        ['lol', Validators.required ],
        ['pes', Validators.required ]
      ], Validators.required)
    }
  );

  nuevoFavorito: FormControl = this.formBuilder.control('', Validators.required );

  get favoritosArr(): FormArray {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  campoEsValido( campo: string ): boolean | null{
    return this.miFormulario.controls[campo].errors
           && this.miFormulario.controls[campo].touched;
  }

  agregarFavorito(): void {
    if ( this.nuevoFavorito.invalid ){
      return;
    }

    this.favoritosArr.push( this.formBuilder.control( this.nuevoFavorito.value, Validators.required ) );

    this.nuevoFavorito.reset();
  }

  guardar(): void  {
    if ( this.miFormulario.invalid ){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

  borrar(index: number) {
    this.favoritosArr.removeAt( index );
  }

}
