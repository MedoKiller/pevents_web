import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { City } from './test';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Event } from './event';
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    MultiSelectModule,
    NoopAnimationsModule, // Use NoopAnimationsModule or BrowserAnimationsModule, but not both
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EventService],
  animations: [], // You can add animations here if needed
})
export class AppComponent implements OnInit {
  title = 'pevents_web';

  public events: Event[] = [];

  cities!: City[];

  selectedCities!: City[];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    /*this.getEvents();*/
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  public getEvents(): void {
    this.eventService.getEvents().subscribe(
      (response: Event[]) => {
        this.events = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  currentView: string = 'searchEvents'; // Default view

  changeView(view: string): void {
    this.currentView = view;
  }

  showFormSimple: boolean = false;

  toggleFormSimple() {
    this.showFormSimple = !this.showFormSimple;
  }

  onSubmit() {
    // Perform any other actions with the form data as needed
  }
}
