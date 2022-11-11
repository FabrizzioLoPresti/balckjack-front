import { Component, Input, OnInit } from '@angular/core';
import { Carta } from 'src/models/Carta';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  @Input() carta!: Carta;
  @Input() oculta: boolean = false;
  imagen: string = '';
  constructor() { 
  }

  ngOnInit(): void {
    this.imagen = this.carta.imagenUrl;
  }

}
