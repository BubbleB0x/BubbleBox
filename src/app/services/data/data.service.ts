import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  report(data){
    //console.log("merda_report");
    //console.log(data);

      return this.http.post(environment.apiUrlLocal+"/reporting",data).subscribe(s=>{
       
      });
    }
}
