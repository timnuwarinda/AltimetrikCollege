import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CollegeService {


  constructor(private httpClient: HttpClient) { }
  search(zip:number, degrees:number, year:number) {
     
      return this.httpClient.get<any>(`http://localhost:3000/colleges?zip=${zip}&degrees=${degrees}&year=${year}`); 
  }
}
