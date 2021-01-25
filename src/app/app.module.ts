import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GobanComponent } from './components/goban/goban.component';
import { FunComponent } from './page-components/fun/fun.component';
import { ConfigurationComponent } from './page-components/configuration/configuration.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { LayoutService } from './services/layout.service';
import { AboutComponent } from './page-components/about/about.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AppComponent,
    GobanComponent,
    FunComponent,
    ConfigurationComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
  ],
  exports: [
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
