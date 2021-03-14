import { Component } from '@angular/core';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  nuevoJuego: string = '';
  persona: Persona = {
    nombre: 'Fredy',
    favoritos: [
      {
        id: 1,
        nombre: 'lol'
      },
      {
        id: 2,
        nombre: 'pes'
      }
    ]
  };

  guardar(): void{
    console.log('Formulario posteado');
  }

  eliminar( index: number): void{
    this.persona.favoritos.splice(index, 1);
  }

  agregarJuego(): void{
    if ( !this.nuevoJuego ){
      return;
    }
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    };
    this.persona.favoritos.push({ ...nuevoFavorito });
    this.nuevoJuego = '';
  }

}
