import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PeopleSearchTableDataSource } from './people-search-table-datasource';
import { Person } from '../person';
import { MatPaginator, MatSort } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
// import { PEOPLE_DATA } from '../people-data';

@Component({
  selector: 'app-people-search-table',
  templateUrl: './people-search-table.component.html',
  styleUrls: ['./people-search-table.component.css']
})

export class PeopleSearchTableComponent implements OnInit {

      constructor(private dataService: PeopleSearchTableDataSource) { }
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

    public message: string;
    public values: Person[];

    public person: Person;
    newPerson: Person;
    people: Person[] = [];

    displayedColumns = ['id', 'firstName', 'lastName', 'streetAddress', 'city', 'state', 'zip', 'age', 'interests', 'image'];

    dataSource = new MatTableDataSource(this.people);

    ngOnInit() {

      this.dataService.getAll().subscribe(
        data => {
// tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < data.length; i++) {
                this.people.push(data[i] as Person);
              }
                this.people = data;
                this.people.forEach(p => {
                this.person = p;
                this.person.id = p.Id;
                this.person.firstName = p.FirstName;
                this.person.lastName = p.LastName;
                this.person.streetAddress = p.StreetAddress;
                this.person.city = p.City;
                this.person.state = p.State;
                this.person.zip = p.Zip;
                this.person.age = p.Age;
                this.person.interests = p.Interests;
                this.person.image = p.Image;
                console.log(this.person.id);
                this.dataSource.data = this.people;
              });
            },
              error => {console.log('error'); },
              () => {console.log(this.people); }
              );
      console.log(this.people);
              }


      save(): void {
          this.dataService.updatePerson(this.person)
            .subscribe(() => 
            console.log('Save successful'));
        }

      add(id: number, firstName: string, lastName: string, streetAddress: string, city: string, state: string, zip: string,
          age: number, interests: string, image: object): void {
            this.newPerson.id = id;
            this.newPerson.firstName = firstName;
            this.newPerson.lastName = lastName;
            this.newPerson.streetAddress = streetAddress;
            this.newPerson.city = city;
            this.newPerson.state = state;
            this.newPerson.zip = zip;
            this.newPerson.age = age;
            this.newPerson.interests = interests;
            this.newPerson.image = image;
            console.log(this.newPerson);
            this.dataService.addPerson(this.newPerson)
              .subscribe(p => {
              this.people.push(this.person);
          });
        }

        filter(filterValue: string) {
          this.dataSource.filter = filterValue.trim().toLowerCase();
          console.log(this.dataSource);
        }
   }
