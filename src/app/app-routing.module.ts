import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from './_core/core.module';
import { ShareModule } from './_share/share.module';
import { TodosComponent } from './todos/todos.component';
import { EventsComponent } from './events/events.component';
import { UsersComponent } from './users/users.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'home',
    component: AppComponent, pathMatch: 'full'
  },
  {
    path: 'todos',
    component: TodosComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'user',
    component: UsersComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
