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
    AddUser = (name:string) =>{let body = {name: name};
      return this.http.post('https://laced-season-thing.glitch.me/users', body);
    }
    AddNote = (note:string, category: string, name:string) =>{let body = {content: note, category: category, name: name}
    console.log(category);
      return this.http.post('https://laced-season-thing.glitch.me/notes',body);
    } 
    GetNotes = (name:string) =>{
      return this.http.get('https://laced-season-thing.glitch.me/notes?name='+name);
    }
    DeleteNote = ( note: string, name: string) =>{let body = {content: note, name: name}
      //return this.http.delete('http://laced-season-thing.glitch.me/notes');
      return this.http.request('delete', 'http://laced-season-thing.glitch.me/notes', { body: { content: note, name: name } });
    }
    DeleteUserAndNotes = (name:string) =>{
      return this.http.delete('https://laced-season-thing.glitch.me/users?name='+name);
    }
}
