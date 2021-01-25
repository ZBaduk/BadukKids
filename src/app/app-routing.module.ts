import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './page-components/configuration/configuration.component';
import { FunComponent } from './page-components/fun/fun.component';


const routes: Routes = [
  { path: 'play', component: FunComponent },
  { path: '**', component: ConfigurationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
