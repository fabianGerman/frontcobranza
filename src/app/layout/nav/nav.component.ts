import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModeloUsuario } from 'src/app/modelos/usuarios/modelo-usuario';
import { Router } from '@angular/router';
import { ServiciosUsuarioService } from 'src/app/servicios/usuarios/servicios-usuario.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  token!:string;

  constructor(private login_prov:ServiciosUsuarioService, private toastr: ToastrService, private router: Router, fb:FormBuilder){
    
  }

  ngOnInit():void{
    const token = localStorage.getItem('token');
    if(token !== null){
      this.token = token.toString();
      
    }else{
      this.token = "";
    }
  }

  public logout(){
    this.login_prov.logout(this.token).subscribe({
      next:()=>{
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    })
  }
}
