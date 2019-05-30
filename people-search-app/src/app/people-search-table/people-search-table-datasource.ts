import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Configuration } from '../app.constants';
import { Person } from '../person';


@Injectable()
export class PeopleSearchTableDataSource {

    private actionUrl: string;

    people: Observable<Person[]>;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    constructor(private http: HttpClient, private configuration: Configuration) {
        this.actionUrl = configuration.serverWithApiUrl;
    }

  getAll() {
    this.people = this.http.get<Person[]>(this.actionUrl);
    // console.log(this.people);
    return this.people;
  }

  updatePerson(person: Person): Observable<any> {
    return this.http.put(this.actionUrl + person.id + person, person, this.httpOptions).pipe(
      tap(_ => console.log(`updated person id=${person.id}`)),
      catchError(this.handleError<any>('updatePerson'))
    );
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.actionUrl, person, this.httpOptions).pipe(
        tap((newPerson: Person) => console.log(`added person w/ id=${newPerson.id}`)),
        catchError(this.handleError<Person>('addPerson'))
      );
  }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req);
      }
    }

// public getAll<T>(): Observable<T> {
//     return this.http.get<T>(this.actionUrl);
// }

// public getSingle<T>(id: number): Observable<T> {
//     return this.http.get<T>(this.actionUrl + id);
// }

// public add<T>(itemName: string): Observable<T> {
//     const toAdd = { ItemName: itemName };

//     return this.http.post<T>(this.actionUrl, toAdd);
// }

// public update<T>(id: number, itemToUpdate: any): Observable<T> {
//     return this.http
//         .put<T>(this.actionUrl + id, itemToUpdate);
// }

// public delete<T>(id: number): Observable<T> {
//     return this.http.delete<T>(this.actionUrl + id);
// }
