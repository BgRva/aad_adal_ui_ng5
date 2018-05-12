import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { LoggerService } from './logger.service';
import { environment } from '../../../environments/environment';
import { TodoItem, EventItem } from '../../_models';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  private todoApi: string;
  private eventApi: string;

  constructor(private http: HttpClient,
    private logger: LoggerService) {
    this.todoApi = environment.todoApiBase + 'todo/';
    this.eventApi = environment.eventApiBase + 'event/';
    this.logger.debug('DataService::todoApi::' + this.todoApi);
    this.logger.debug('DataService::eventApi::' + this.eventApi);
  }

  // TODOS

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.todoApi)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getTodoes', []))
      );
  }

  /** GET todo by id. Will 404 if id not found */
  getTodo(id: number): Observable<TodoItem> {
    const url = `${this.todoApi}/${id}`;
    return this.http.get<TodoItem>(url).pipe(
      tap(_ => this.log(`fetched todo id=${id}`)),
      catchError(this.handleError<TodoItem>(`getTodo id=${id}`))
    );
  }

  /** POST: add a new todo to the server */
  createTodo(todo: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.todoApi, todo, httpOptions).pipe(
      tap((item: TodoItem) => this.log(`added todo w/ id=${item.id}`)),
      catchError(this.handleError<TodoItem>('addTodo'))
    );
  }

  /** DELETE: delete the todo from the server */
  deleteTodo(todo: TodoItem | number): Observable<TodoItem> {
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.todoApi}/${id}`;

    return this.http.delete<TodoItem>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<TodoItem>('deleteTodo'))
    );
  }

  /** PUT: update the todo on the server */
  updateTodo(todo: TodoItem): Observable<any> {
    const url = `${this.todoApi}/${todo.id}`;
    return this.http.put(url, todo, httpOptions).pipe(
      tap(_ => this.log(`updated todo id=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  // EVENTS

  getEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.eventApi)
      .pipe(
        tap(heroes => this.log(`fetched events`)),
        catchError(this.handleError('getEvents', []))
      );
  }

  getEvent(id: number): Observable<EventItem> {
    const url = `${this.eventApi}/${id}`;
    return this.http.get<EventItem>(url).pipe(
      tap(_ => this.log(`fetched event id=${id}`)),
      catchError(this.handleError<EventItem>(`getEvent id=${id}`))
    );
  }

  createEvent(event: EventItem): Observable<EventItem> {
    return this.http.post<EventItem>(this.eventApi, event, httpOptions).pipe(
      tap((item: EventItem) => this.log(`added event w/ id=${item.id}`)),
      catchError(this.handleError<EventItem>('addEvent'))
    );
  }

  deleteEvent(event: EventItem | number): Observable<EventItem> {
    const id = typeof event === 'number' ? event : event.id;
    const url = `${this.eventApi}/${id}`;

    return this.http.delete<EventItem>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted event id=${id}`)),
      catchError(this.handleError<EventItem>('deleteEvent'))
    );
  }

  updateEvent(event: EventItem): Observable<any> {
    const url = `${this.eventApi}/${event.id}`;
    return this.http.put(url, event, httpOptions).pipe(
      tap(_ => this.log(`updated todo id=${event.id}`)),
      catchError(this.handleError<any>('updateEvent'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TodoService message with the MessageService */
  private log(message: string) {
    this.logger.debug(message);
  }
}
