import { Component } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: ICliente[] = [];
  constructor(
    private clientesService: ClientesService
    ){}

  ngOnInit(){
    this.clientesService.listarTodosClientes().subscribe((result: ICliente[]) => {
      this.clientes = result;
    });
  }

  buscarTodosClientes() {
    this.clientesService.listarTodosClientes().subscribe((clientes: ICliente[]) => {
      this.clientes = clientes;
    }, (error) => {
      console.error(error);
    });
  }

  excluir(cpf: String) {
    if (cpf) {
      this.clientesService.excluirClientePorCpf(cpf).subscribe(() => {
        Swal.fire(
          'SUCESSO',
          'Cliente excluido com sucesso!',
          'success'
        )
        this.buscarTodosClientes();
      }, (error) => {
        console.error(error);
      })
      return;
    }
  }
}
