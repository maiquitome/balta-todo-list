import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: String = 'list';
  public todos: Todo[] = [];
  public title: String = 'Lista de Tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3), // mínimo de caracteres
        Validators.maxLength(60), // máximo de caracteres
        Validators.required 
      ])]
    })

    this.load();
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data); // converte uma string em JSON
    } else {
      this.todos = [];
    }
  }
  
  add() {
    // this.form.value -> retorna um json { title: 'Titulo' }
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clearForm();
  }

  save() {
    const data = JSON.stringify(this.todos); // converte um JSON em uma string
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  clearForm() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    const wasFound = index !== -1;

    if (wasFound) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  changeMode(mode: String) {
    this.mode = mode;
  }
}