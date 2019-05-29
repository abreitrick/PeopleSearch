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

  addPerson(person:Person): Observable<Person> {
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


// import { DataSource } from '@angular/cdk/collections';
// import { MatPaginator, MatSort } from '@angular/material';
// import { map } from 'rxjs/operators';
// import { Observable, of as observableOf, merge } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { Person } from '../person';
// import { PACKAGE_ROOT_URL } from '@angular/core';

// // TODO: Replace this with your own data model type
// export interface PeopleSearchTableItem {
//   name: string;
//   id: number;
// }

// // TODO: replace this with real data from your application
// const EXAMPLE_DATA: PeopleSearchTableItem[] = [
//   {id: 1, name: 'Hydrogen'},
//   {id: 2, name: 'Helium'},
//   {id: 3, name: 'Lithium'},
//   {id: 4, name: 'Beryllium'},
//   {id: 5, name: 'Boron'},
//   {id: 6, name: 'Carbon'},
//   {id: 7, name: 'Nitrogen'},
//   {id: 8, name: 'Oxygen'},
//   {id: 9, name: 'Fluorine'},
//   {id: 10, name: 'Neon'},
//   {id: 11, name: 'Sodium'},
//   {id: 12, name: 'Magnesium'},
//   {id: 13, name: 'Aluminum'},
//   {id: 14, name: 'Silicon'},
//   {id: 15, name: 'Phosphorus'},
//   {id: 16, name: 'Sulfur'},
//   {id: 17, name: 'Chlorine'},
//   {id: 18, name: 'Argon'},
//   {id: 19, name: 'Potassium'},
//   {id: 20, name: 'Calcium'},
// ];

// /**
//  * Data source for the PeopleSearchTable view. This class should
//  * encapsulate all logic for fetching and manipulating the displayed data
//  * (including sorting, pagination, and filtering).
//  */
// export class PeopleSearchTableDataSource extends DataSource<PeopleSearchTableItem> {
//   readonly ROOT_URL = 'http://localhost:65113/api/people';

//   people: Observable<Person[]>;

//   // data: PeopleSearchTableItem[] = EXAMPLE_DATA;
//   data: PeopleSearchTableItem[] = this.people;

//   constructor(private paginator: MatPaginator, private sort: MatSort, private http: HttpClient) {
//     super();
//   }

//   /**
//    * Connect this data source to the table. The table will only update when
//    * the returned stream emits new items.
//    * @returns A stream of the items to be rendered.
//    */
//   connect(): Observable<PeopleSearchTableItem[]> {

//     this.people = this.http.get<Person[]>(this.ROOT_URL);
//     // Combine everything that affects the rendered data into one update
//     // stream for the data-table to consume.
//     const dataMutations = [
//       observableOf(this.data),
//       this.paginator.page,
//       this.sort.sortChange
//     ];

//     // Set the paginator's length
//     this.paginator.length = this.data.length;

//     return merge(...dataMutations).pipe(map(() => {
//       return this.getPagedData(this.getSortedData([...this.data]));
//     }));
//   }

//   /**
//    *  Called when the table is being destroyed. Use this function, to clean up
//    * any open connections or free any held resources that were set up during connect.
//    */
//   disconnect() {}

//   /**
//    * Paginate the data (client-side). If you're using server-side pagination,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getPagedData(data: PeopleSearchTableItem[]) {
//     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//     return data.splice(startIndex, this.paginator.pageSize);
//   }

//   /**
//    * Sort the data (client-side). If you're using server-side sorting,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getSortedData(data: PeopleSearchTableItem[]) {
//     if (!this.sort.active || this.sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       const isAsc = this.sort.direction === 'asc';
//       switch (this.sort.active) {
//         case 'name': return compare(a.name, b.name, isAsc);
//         case 'id': return compare(+a.id, +b.id, isAsc);
//         default: return 0;
//       }
//     });
//   }
// }

// /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a, b, isAsc) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
