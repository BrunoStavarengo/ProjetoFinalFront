import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-atualizar-clientes',
  templateUrl: './cadastrar-atualizar-clientes.component.html',
  styleUrls: ['./cadastrar-atualizar-clientes.component.css']
})
export class CadastrarAtualizarClientesComponent {


  clienteForm = new FormGroup({
    cpf: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    cep: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    rendimentoMensal: new FormControl(0, Validators.required),
  })


  constructor(
    private clienteService: ClientesService,
     private route: ActivatedRoute,
     private router: Router
     ){}

  clienteCpf = 0;


  ngOnInit(){
    this.clienteCpf = Number (this.route.snapshot.paramMap.get('cpf'));
    if (this.clienteCpf){
      this.clienteService.buscarClientePorCpf(String (this.clienteCpf)).subscribe((cliente: ICliente) => {
        this.clienteForm.setValue({
          cpf: cliente.cpf,
          nome: cliente.nome,
          telefone: cliente.telefone,
          cep: cliente.cep,
          endereco: cliente.endereco,
          numero: cliente.numero,
          rendimentoMensal: cliente.rendimentoMensal || 0
        })
      });
    }


  }

  cadastrar(){
    const cliente: ICliente = this.clienteForm.value as ICliente;
    this.clienteService.cadastrarCliente(cliente).subscribe(result =>{
      Swal.fire(
        'SUCESSO',
        'Cliente cadastrado',
        'success'
      )
      this.router.navigateByUrl('/clientes');
    }, error => {
      console.error(error);
    });
  }




}
