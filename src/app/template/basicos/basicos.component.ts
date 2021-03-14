import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Producto {
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm: Producto = {
    nombre: 'Fredy',
    precio: 627,
    existencias: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

  guardar( ): void {
    // console.log( this.miFormulario );
    console.log('Posteo exitoso!');

    this.miFormulario.resetForm({
      nombre: 'Carlos',
      precio: 0,
      existencias: 0
    });
  }

  nombreValido(): boolean {
    return this.miFormulario?.controls.nombre?.invalid && this.miFormulario?.controls.nombre?.touched;
  }

  precioValido(): boolean {
    return this.miFormulario?.controls.precio?.touched && this.miFormulario?.controls.precio?.value < 0;
  }

}
