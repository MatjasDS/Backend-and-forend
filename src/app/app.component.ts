import { Component } from '@angular/core';
import { APIService } from './api.service';
import { MatTableModule } from '@angular/material';

interface Users{
  name:string;
  id:number;
}

interface Notes{
  id:number;
  message:string;
  userId:number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotesApp';

  addUser:boolean = false;
  showUsers:boolean = false;
  addNote:boolean = false;
  showNotes:boolean = false;
  userList: Array<Users>;
  notesList: Array<Notes>;
  displayedColumnsUsers: string[] = ["Naam"];
  service: APIService;

  constructor(apiService: APIService){
    this.service = apiService;
    apiService.getUsers().subscribe((data: Array<Users>) => {
      console.log(data);
      this.userList = data;
    })
  }
  AddUserView = () => {
      this.addUser=true;
  }

  ShowUserView = () => {
    this.showUsers=true;
  }

  AddNoteView = () => {
    this.addNote=true;
  }

  ShowNotesView = () => {
    this.showNotes=true;
  }

  
}
