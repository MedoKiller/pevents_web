import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Event } from './event';
import { EventService } from './event.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormGroup,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule,FormsModule],
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



  name: string ='';
  startTime: string ='';
  endTime: string ='';
  freeEntrance: string ='';
  selectedCity: string ='';

  private formData =  {
    name: this.name,
    startTime: this.startTime,
    endTime: this.endTime,
    freeEntrance: this.freeEntrance,
    selectedCity: this.selectedCity
  };

  public formEvents: Event | undefined;

  onSubmit() {
    this.formData = {
      name: this.name,
      startTime: this.startTime,
      endTime: this.endTime,
      freeEntrance: this.freeEntrance,
      selectedCity: this.selectedCity
    };

    console.log('Form submitted:', this.formData);

    this.getEvents2();
    // Perform any other actions with the form data as needed
  }

  public getEvents2(): void {
    this.eventService.findEvents(this.formData).subscribe(
      (response: Event[]) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}


