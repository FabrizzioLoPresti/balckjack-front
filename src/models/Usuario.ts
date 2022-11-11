export class Usuario {
  public id: number
  public email: string
  public password: string
  public passwordConfirmation: string = ''
  
  constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  toString() {
    return `Usuario [id=${this.id}, email=${this.email}, password=${this.password}]`;
  }
}