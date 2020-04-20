import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  report(data){
   
  
      return this.http.post(environment.apiUrlLocal+"/reporting",data).subscribe(s=>{
       
      });
    }

   
    
    
}
