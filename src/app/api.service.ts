import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {}

    getUsers = () =>{
      return this.http.get('https://laced-season-thing.glitch.me/users');
    }
    AddUser = (name:string) =>{let body = {name: name,};
      return this.http.post('https://laced-season-thing.glitch.me/add', body);
    }
    AddNote = (note:string, name:string) =>{
      return this.http.get('https://laced-season-thing.glitch.me/addnote?name='+name+'&content='+note);
    }
    GetNotes = (name:string) =>{
      return this.http.get('https://laced-season-thing.glitch.me/notes?name='+name);
    }
    DeleteUserAndNotes = (name:string) =>{
      return this.http.get('https://laced-season-thing.glitch.me/remove?name='+name);
    }
}
