import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './_core/core.module';
import { ShareModule } from './_share/share.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { TodosComponent } from './todos/todos.component';
import { EventsComponent } from './events/events.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TodosComponent,
    EventsComponent
  ],
  imports: [
    FormsModule, BrowserModule, HttpClientModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
