import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IterateComponentComponent } from './iterate-component/iterate-component.component';
import { TaskListComponent } from './task-list/task-list.component';
import { LoginComponent } from './login/login.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { RegisterComponent } from './components/register/register.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component'; // Importa el componente


@NgModule({
  declarations: [
    AppComponent,
    IterateComponentComponent,
    TaskListComponent,
    LoginComponent,
    CreateTaskComponent,
    RegisterComponent,
    EditTaskComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
