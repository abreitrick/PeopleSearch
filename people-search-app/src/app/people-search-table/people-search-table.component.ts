import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PeopleSearchTableDataSource } from './people-search-table-datasource';
import { Person } from '../person';
import { MatPaginator, MatSort } from '@angular/material';
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
    people: Person[] = [];

    displayedColumns = ['id', 'firstName', 'lastName', 'streetAddress', 'city', 'state', 'zip', 'interests', 'image'];

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
              });
            },
              error => {console.log('error'); },
              () => {console.log(this.people); }
              );
      console.log(this.people);
              }

          }
