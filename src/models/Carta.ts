export class Carta {
  public valor: number;
  public naipe: string;
  public imagenUrl: string;

  constructor(valor: number, naipe: string, imagenUrl: string) {
    this.valor = valor;
    this.naipe = naipe;
    this.imagenUrl = imagenUrl;
  }

  public toString(): string {
    return `${this.valor} de ${this.naipe}`;
  }
}