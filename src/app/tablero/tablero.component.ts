import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carta } from 'src/models/Carta';
import Swal from 'sweetalert2';
import { CartasService } from '../services/cartas.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
})
export class TableroComponent implements OnInit, OnDestroy {
  cartasJugador: Carta[] = [];
  cartasCrupier: Carta[] = [];
  puntajeJugador: number = 0;
  puntajeCrupier: number = 0;
  activo: boolean = false;
  idUsuario: number = 0;

  constructor(public cartasService: CartasService, private router: Router) {}

  ngOnInit(): void {
    this.idUsuario = Number(localStorage.getItem('idUsuario'));
    console.log(this.idUsuario);
    this.comenzarJuego();
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  comenzarJuego(): void {
    this.cartasService.hayPartidaGuardada(this.idUsuario).subscribe((data) => {
      if (data) {
        Swal.fire({
          title: 'Comenzando juego',
          text: 'Espere un momento',
          allowOutsideClick: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then((result) => {
          this.cargarPartida();
          setTimeout(() => {}, 1000);
        });
      } else {
        this.comenzarJuegoDe0();
      }
    });
  }

  comenzarJuegoDe0(): void {
    Swal.fire({
      title: 'Comenzando juego',
      text: 'Espere un momento',
      allowOutsideClick: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      this.pedirCartaJugador();
      this.pedirCartaCrupier();
      setTimeout(() => {
        this.pedirCartaJugador();
      }, 1000);
    });
  }

  validarMazo(carta:Carta, player:String): boolean {
    // validad que no se repita la carta en el mazo dependiendo del jugador
    if(player == 'jugador'){
      return this.cartasJugador.some(c => c.valor == carta.valor && c.naipe == carta.naipe);
    }
    if(player == 'crupier'){
      return this.cartasCrupier.some(c => c.valor == carta.valor && c.naipe == carta.naipe);
    }
    return false;
  }

  pedirCartaJugador(): void {
    let cartaJugador;
    this.cartasService.getCarta(1).subscribe((carta) => {
      cartaJugador = carta;
      if(this.validarMazo(cartaJugador, 'jugador')) {
        this.pedirCartaJugador()
      } else {
        this.cartasJugador.push(cartaJugador);
        this.calcularPuntos();
        this.logicaJugador();
      }
    });
  }

  pedirCartaCrupier(): void {
    let cartaCrupier;
    this.cartasService.getCarta(2).subscribe((carta) => {
      cartaCrupier = carta;
      if(this.validarMazo(cartaCrupier, 'crupier')) {
        this.pedirCartaCrupier()
      } else {
        this.cartasCrupier.push(cartaCrupier);
        this.logicaAsesCrupier();
        this.calcularPuntos();
      }
    });
  }

  logicaJugador(): void {
    if(this.puntajeJugador > 21){
      this.activo = true;
      this.logicaCrupier();
    }
  }

  logicaCrupier(): void {
    if(this.puntajeCrupier < 17){
      this.pedirCartaCrupier();
      setTimeout(() => {
        this.logicaCrupier();
      }, 1000);
    } else {
      this.calcularGanador();
    }
  }

  logicaAses(des: boolean): void {
    this.cartasJugador.forEach((carta) => {
      if (carta.valor == 1 || carta.valor == 11) {
        if (des) {
          carta.valor = 11;
        } else {
          carta.valor = 1;
        }
      }
    });
    console.log(this.cartasJugador);
    this.calcularPuntos();
  }

  logicaAsesCrupier(): void {
    this.cartasCrupier.forEach((carta) => {
      if (carta.valor == 1 || carta.valor == 11) {
        if (this.puntajeCrupier < 11) {
          carta.valor = 11;
        } else {
          carta.valor = 1;
        }
      }
    });
    this.calcularPuntos();
  }

  plantarse(): void {
    this.activo = true;
    this.logicaCrupier();
  }

  calcularPuntos(): void {
    this.puntajeJugador = 0;
    this.puntajeCrupier = 0;
    this.cartasJugador.forEach((carta) => {
      this.puntajeJugador += carta.valor;
    });
    this.cartasCrupier.forEach((carta) => {
      this.puntajeCrupier += carta.valor;
    });
  }

  calcularGanador(): void {
    if(this.puntajeJugador > 21){
      Swal.fire({
        icon: 'error',
        title: 'Perdiste',
        text: 'Mala suerte, vuelve a intentarlo',
      })
    } else if(this.puntajeCrupier > 21){
      Swal.fire({
        icon: 'success',
        title: 'Ganaste',
        text: 'Felicidades, has ganado',
      })
    } else if(this.puntajeJugador > this.puntajeCrupier){
      Swal.fire({
        icon: 'success',
        title: 'Ganaste',
        text: 'Felicidades, has ganado',
      })
    } else if(this.puntajeJugador < this.puntajeCrupier){
      Swal.fire({
        icon: 'error',
        title: 'Perdiste',
        text: 'Mala suerte, vuelve a intentarlo',
      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Empate',
        text: 'No hay ganador',
      })
    }
  }

  reiniciar(): void {
    this.cartasService.reset().subscribe((data) => {
      console.log(data);
      if (data) {
        this.cartasJugador = [];
        this.cartasCrupier = [];
        this.puntajeJugador = 0;
        this.puntajeCrupier = 0;
        this.activo = false;
        this.comenzarJuego();
      }
    });
  }

  salir(): void {
    this.cartasService.reset().subscribe((data) => {
      console.log(data);
      if (data) {
        this.cartasJugador = [];
        this.cartasCrupier = [];
        this.puntajeJugador = 0;
        this.puntajeCrupier = 0;
        this.activo = false;
      }
    });
  }

  reportes(){
    this.router.navigate(['/reportes']);
  }

  logout(): void {
    Swal.fire({
      title: 'Aviso',
      text: '¿Desea guardar la partida?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'No, salir',
    }).then((result) => {
      if (result.isConfirmed) {
        this.guardarPartida();
        this.salir();
        this.router.navigate(['']);
      } else {
        this.salir();
        this.router.navigate(['']);
      }
    });
  }

  guardarPartida(): void {
    this.cartasService.guardarPartida(this.idUsuario).subscribe((data) => {
      console.log(data);
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Partida guardada',
          text: 'La partida ha sido guardada',
        });
      }
    });
  }

  cargarPartida(): void {
    Swal.fire({
      title: 'Aviso',
      text: '¿Desea cargar la partida guardada?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cargar',
      cancelButtonText: 'No, iniciar nueva partida',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartasService
          .cargarPartidaJugador(this.idUsuario)
          .subscribe((data) => {
            if (data) {
              for (let i = 0; i < data.length; i++) {
                this.cartasJugador.push(data[i]);
              }
              this.calcularPuntos();
              this.logicaJugador();
            }
          });
        this.cartasService
          .cargarPartidaCrupier(this.idUsuario)
          .subscribe((data) => {
            if (data) {
              for (let i = 0; i < data.length; i++) {
                this.cartasCrupier.push(data[i]);
              }
              this.logicaAsesCrupier();
              this.calcularPuntos();
            }
          });
      } else {
        this.comenzarJuegoDe0();
      }
    });
  }
}
