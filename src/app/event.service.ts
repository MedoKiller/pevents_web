import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "./event";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EventService{
    private apiServerUrl=environment.apiBaseUrl;

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
      };

    constructor(private http: HttpClient){}

    public getEvents(): Observable<Event[]>{
        return this.http.get<Event[]>(`${this.apiServerUrl}/event/all`);
    }

    public addEvent(event: Event): Observable<Event>{
        return this.http.post<Event>(`${this.apiServerUrl}/event/add`, event);
    }

    public updateEvent(event: Event): Observable<Event>{
        return this.http.put<Event>(`${this.apiServerUrl}/event/update`, event);
    }

    public deleteEvent(eventId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/event/delete/${eventId}`);
    }

    public findEvents(formData: object): Observable<Event[]>{
        return this.http.post<Event[]>(`${this.apiServerUrl}/event/find/simple`,formData,this.httpOptions);
    }

}