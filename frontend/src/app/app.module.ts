import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemModule } from './items/item.module';
import { HeaderComponent } from './items/header.component';
import { FooterComponent } from './items/footer.component';

import { ItemComponent } from './items/item.component';
import { PostComponent } from './items/post.component';
import { NotFoundComponent } from './items/not-found.component';
import { SearchComponent } from './items/search.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ItemComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    NotFoundComponent,
    SearchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ItemModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
