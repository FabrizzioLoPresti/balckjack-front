import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/Usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario = {} as Usuario;
  constructor(private router: Router,
    private usuarioService: UsuarioService) { 
    this.usuario = new Usuario(0, '', '');
  }

  ngOnInit(): void {
  }

  register() {
    if([this.usuario.email, this.usuario.password, this.usuario.passwordConfirmation].includes('') || !this.validarMail() || !this.validarPassword()) {
      return alert('Completar los campos correctamente');
    }

    this.usuarioService.registrar(this.usuario.email, this.usuario.password).subscribe(data => {
      if(data) {
        this.router.navigate(['']);
      } else {
        alert('Error');
      }
    });
    
  }

  validarMail(): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(this.usuario.email);
  }

  validarPassword(): boolean {
    return this.usuario.password.length >= 6 && this.usuario.password === this.usuario.passwordConfirmation;
  }

  
}
