import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  baseUrl  = 'https://student-api.mycodelibraries.com/api/user'; 

  constructor(private http:HttpClient) {
   }

   getData(): Observable<any>{
    return this.http.get(this.baseUrl+"/"+"get");
   }
   postData(reqObj:any):Observable<any>{
    return this.http.post(this.baseUrl+"/"+"add",reqObj);
   }
   deleteData(id:string):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+"delete"+"/"+id);
   }
   putData(id:String,reqObj:any):Observable<any>{
    return this.http.put(this.baseUrl+"/"+"update"+"/"+id,reqObj);
   }
}
