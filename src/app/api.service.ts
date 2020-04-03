import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {}

    getUsers = () =>{
      return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/users');
    }
    AddUser = (name:string) =>{
      return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/add?name='+name);
    }
    AddNote = (note:string, name:string) =>{
      return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/addnote?name='+name+'&content='+note);
    }
    GetNotes = (name:string) =>{
      return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/notes?name='+name);
    }
    DeleteUserAndNotes = (name:string) =>{
      return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/remove?name='+name);
    }
}
