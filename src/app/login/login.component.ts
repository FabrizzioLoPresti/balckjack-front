import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/Usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {} as Usuario;
  constructor(private router: Router,
              private usuarioService: UsuarioService) { 
    this.usuario = new Usuario(0, '', '');
  }

  ngOnInit(): void {
  }

  login() {
    if([this.usuario.email, this.usuario.password].includes('') || !this.validarMail()) {
      return alert('Completar los campos correctamente');
    }

    this.usuarioService.login(this.usuario.email, this.usuario.password).subscribe(data => {
      if(data != 0) {
        localStorage.setItem('idUsuario', data.toString());
        console.log(data);
        this.router.navigate(['/game']);
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    });
  }

  validarMail(): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(this.usuario.email);
  }


}
