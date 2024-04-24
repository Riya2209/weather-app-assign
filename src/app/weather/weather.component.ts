import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  data: any = {};
  location: string = '';
  isCelsius: boolean = true;
  temp: number = 0;
  weatherCondition: string = '';
  imageUrl: string = '';
  errorMessage: string = '';

  constructor (private apiService: WeatherService){}
  

  // function to search location through input box b calling open weather api
  searchLocation(event: KeyboardEvent): void{
    if(event.key === 'Enter'){
      this.apiService.getWeather(this.location).subscribe((response: any) => {
        this.data = response;
        console.log(response);
        this.temp = response.main.temp;
        this.setWeatherCondition(); 
        this.setImageUrl();
        this.errorMessage = ''; 
      },
      (error: any)=>{
        console.error('Error fetching weather data:', error);
        this.errorMessage = 'Invalid city entered. Please try again.';
      });
    }
  }

  //function to convert temp to celcius
   toCelsius(temp: number): number {
    return (temp - 32) * 5/9;
   }

   get temperature(): string {
    if (this.data.main) {
      return this.isCelsius ? this.toCelsius(this.data.main.temp).toFixed() : this.data.main.temp.toFixed();
    }
    return '';
  }

  get feelsLike(): string {
    if (this.data.main) {
      return this.isCelsius ? this.toCelsius(this.data.main.feels_like).toFixed() : this.data.main.feels_like.toFixed();
    }
    return '';
  }

  get temperatureUnit(): string {
    return this.isCelsius ? '°C' : '°F';
  }
   
  // function to set weather condition
  setWeatherCondition(): void {
    const weatherDescription = this.data.weather[0].description.toLowerCase();
    if (weatherDescription.includes('cloud')) {
      this.weatherCondition = 'cloudy';
    } 
    else if(weatherDescription.includes('clear')){
      this.weatherCondition = 'clear'
    }
    else if(weatherDescription.includes('rain')){
      this.weatherCondition = 'rainy'
    }
    else {
      this.weatherCondition = 'sunny';
    }
  }

  // function to set image urls according to weather condition to render dynamically
  setImageUrl(): void {
    if (this.weatherCondition === 'sunny' && this.temp > 25) {
      this.imageUrl = '/assets/sunny.png'; 
    } 
    else if (this.weatherCondition === 'sunny') {
      this.imageUrl = '/assets/sunny.png'; 
    }
    else if(this.weatherCondition === 'clear'){
        this.imageUrl = '/assets/clear.png'
    } 
    else if(this.weatherCondition === 'rainy'){
      this.imageUrl = '/assets/rainy.png'
    } 
    else if(this.weatherCondition === 'cloudy'){
      this.imageUrl = '/assets/cloudy.png'
  } 
    else {
      this.imageUrl = '/assets/clear.jpg'; 
    }
  }
}
