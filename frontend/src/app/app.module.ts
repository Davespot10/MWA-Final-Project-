import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './footer.component';
import { ItemComponent } from './items/item.component';
import { PostComponent } from './items/post.component';
import { NotFoundComponent } from './items/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { SearchPipe } from './search.pipe';
import { ItemModule } from './items/item.module';
import { HeaderComponent } from './header.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddressAutoCompleteComponent } from './address-auto-complete.component'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MapComponent } from './items/map.component'
import { MyItemComponent } from './items/my-item.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ItemComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    NotFoundComponent,
    SearchPipe,
    HeaderComponent,
    AddressAutoCompleteComponent,
    MyItemComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ItemModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    MatTooltipModule,
    MatAutocompleteModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
