import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarAtualizarClientesComponent } from './pages/cadastrar-atualizar-clientes/cadastrar-atualizar-clientes.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'clientes', component: ClientesComponent
  },
  {
    path: 'clientes/cadastrar', component: CadastrarAtualizarClientesComponent
  },
  {
    path: 'clientes/editar/:cpf', component: CadastrarAtualizarClientesComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
