import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StakeCountComponent } from './stake-count/stake-count.component';
import { HeaderComponent } from './header/header.component';
import { StakeComponent } from './stake/stake.component';
import { FormsModule } from '@angular/forms';
import { GemsComponent } from './gems/gems.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    StakeCountComponent,
    HeaderComponent,
    StakeComponent,
    GemsComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
