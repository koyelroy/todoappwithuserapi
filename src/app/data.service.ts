import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private todoData: any = [];
  constructor(private http: HttpClient) { }

  getData() {
    this.todoData = localStorage.getItem('todoData');
    return JSON.parse(this.todoData);
  }

  setData(data: any[]) {
    this.todoData = data;
    localStorage.setItem('todoData', JSON.stringify(this.todoData));
  }

  getUsersApiData(params, page) {
    console.log("from API calls", params);
    return this.http.get<any[]>('https://reqres.in/api/users?page=' + page);
  }
  getUsersApiData1() {
    return this.http.get<any[]>('https://reqres.in/api/users');
  }
}
