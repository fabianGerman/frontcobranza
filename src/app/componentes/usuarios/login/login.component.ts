import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModeloUsuario } from 'src/app/modelos/usuarios/modelo-usuario';
import { Router } from '@angular/router';
import { ServiciosUsuarioService } from 'src/app/servicios/usuarios/servicios-usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  hide = true;
  emailname: string='';
  password: string='';



  constructor(private login_prov:ServiciosUsuarioService, private toastr: ToastrService, private router: Router, fb:FormBuilder){
   
  }

  ngOnInit():void{}

  public login(){
    if(this.emailname == '' || this.password == ''){
      this.toastr.error('todos los campos son obligatorios','error');
    }
    const user: ModeloUsuario = {
      email: this.emailname,
      password: this.password
    }

    this.login_prov.login(user).subscribe({
      next:(token) => {
        localStorage.setItem('token',token['token']);
        this.router.navigate(['/home']);
      }
    });
  }
}
