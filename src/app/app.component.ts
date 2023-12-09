import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Event } from './event';
import { EventService } from './event.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [EventService]
})
export class AppComponent implements OnInit {
  title = 'pevents_web';

  public events: Event[] = [];

  constructor(private eventService: EventService){}

  ngOnInit(): void {
    /*this.getEvents();*/  
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
  showFormAdvanced: boolean = false;

  toggleFormSimple() {
    this.showFormSimple = !this.showFormSimple;
  }

  toggleFormAdvanced() {
    this.showFormAdvanced = !this.showFormAdvanced;
  }


}
