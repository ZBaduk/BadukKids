import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './page-components/about/about.component';
import { ConfigurationComponent } from './page-components/configuration/configuration.component';
import { FunComponent } from './page-components/fun/fun.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: '**', component: FunComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
