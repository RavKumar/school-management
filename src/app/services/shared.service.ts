import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient
  ) { }
  // Student related api calls
  saveStudent(data: any) {
    return this.http.post<any>("http://localhost:3000/studentsList/", data)
  }
  getStudent() {
    return this.http.get<any>("http://localhost:3000/studentsList/")
  }
  putStudent(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/studentsList/"+id, data)
  }
  deleteStudent(id: number) {
    return this.http.delete<any>("http://localhost:3000/studentsList/"+id)
  }
  
  // Marks related api calls
  saveMarks(data: any) {
    return this.http.post<any>("http://localhost:3000/marksList/", data)
  }
  getMarks() {
    return this.http.get<any>("http://localhost:3000/marksList/")
  }
  putMarks(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/marksList/"+id, data)
  }
  deleteMarks(id: number) {
    return this.http.delete<any>("http://localhost:3000/marksList/"+id)
  }
}
