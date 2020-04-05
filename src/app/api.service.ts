import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {}

    getUsers = () =>{
      return this.http.get('https://beneficial-evening-meteoroid.glitch.me/users');
    }
    AddUser = (name:string) =>{
      return this.http.get('https://beneficial-evening-meteoroid.glitch.me/add?name='+name);
    }
    AddNote = (note:string, name:string) =>{
      return this.http.get('https://beneficial-evening-meteoroid.glitch.me/addnote?name='+name+'&content='+note);
    }
    GetNotes = (name:string) =>{
      return this.http.get('https://beneficial-evening-meteoroid.glitch.me/notes?name='+name);
    }
    DeleteUserAndNotes = (name:string) =>{
      return this.http.get('https://beneficial-evening-meteoroid.glitch.me/remove?name='+name);
    }
}
