import { Component } from '@angular/core';
import { APIService } from './api.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

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
  showNote:boolean = false;
  addNote:boolean = false;
  userList: Array<Users>;
  notesList: Array<Notes>;
  service: APIService;
  ingegevenNaamToevoegen: string;
  ingegevenNoteToevoegen: string;
  displayedColumnsUsers: string[] = ['name','note','shownote','remove']; 
  displayedColumnsNotes: string[] = ['content'];


  constructor(apiService: APIService){
    this.service = apiService;
    apiService.getUsers().subscribe((data: Array<Users>) => {
      console.log(data);
      this.userList = data;
    })
  }

  UserlistRefresh = () => this.service.getUsers().subscribe((data: Array<Users>) => {
    console.log(data);
    this.userList = data;
  });

  AddUserView = () => {
      this.addUser = true;
      this.addNote = false;
      this.showNote = false;
  }

  AddNoteView = (addNoteforUser:string) => {
    this.ingegevenNaamToevoegen = addNoteforUser;
    this.addNote = true;
    this.addUser = false;
    this.showNote = false;
  }

  AddUserComponent = () => {
    this.service.AddUser(this.ingegevenNaamToevoegen).subscribe((response) => {
      console.log(response);
      this.UserlistRefresh();
      this.addUser = false;
    });
    
  }

  AddNoteComponent = () => {
    this.service.AddNote(this.ingegevenNoteToevoegen, this.ingegevenNaamToevoegen).subscribe((response) => {
      console.log(response);
      this.UserlistRefresh();
      this.addNote = false;
    })
  }

  ShowNoteComponent = (addNoteforUser:string) => {
      this.ingegevenNaamToevoegen = addNoteforUser;
    this.service.GetNotes(this.ingegevenNaamToevoegen).subscribe((data: Array<Notes>) => {
      console.log(data);
      this.notesList = data;
      this.showNote = true;
      this.addNote = false;
      this.addUser = false;
    });
  }

  DeleteUserAndNotesComponent = (removeName: string) => {
      this.service.DeleteUserAndNotes(removeName).subscribe((response) => {
        this.ingegevenNaamToevoegen = "";
        this.showNote = false;
        this.addNote = false;
        this.addUser = false;
        this.UserlistRefresh();
      });
  }

  
}
