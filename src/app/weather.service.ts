import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '44428a240ded2e0b1c7745b64f66a1bb';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeather(location: string): Observable<any>{
    const url =  `${this.apiUrl}?q=${location}&units=imperial&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
