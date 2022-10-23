import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './items/footer.component';
import { ItemComponent } from './items/item.component';
import { PostComponent } from './items/post.component';
import { NotFoundComponent } from './items/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { SearchPipe } from './search.pipe';
import { ItemModule } from './items/item.module';


@NgModule({
  declarations: [
    AppComponent,
   
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ItemComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    NotFoundComponent,
    SearchPipe


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
