import { Component } from '@angular/core';
import { APIService } from './api.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { MatTableDataSource } from '@angular/material/table';

interface Users{
  name:string;
  id:number;
}

interface Notes{
  id:number;
  message:string;
  categorie: string;
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
  editNote:boolean = false;
  addNote:boolean = false;
  userList: Array<Users>;
  notesList: Array<Notes>;
  service: APIService;
  ingegevenNaamToevoegen: string;
  ingegevenNoteToevoegen: string;
  ingegevenCategoryToevoegen : string;
  categoryArray: string[] = ['Privé', 'Dringend', 'Anders'];
  displayedColumnsUsers: string[] = ['name','note','shownote','remove']; 
  displayedColumnsNotes: string[] = ['content', 'category', 'editnote', 'removenote'];
  dataSource = new MatTableDataSource<Notes>(this.notesList);

  constructor(apiService: APIService){
    this.service = apiService;
    apiService.getUsers().subscribe((data: Array<Users>) => {
      console.log(data);
      this.userList = data;
    });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

  UserlistRefresh = () => this.service.getUsers().subscribe((data: Array<Users>) => {
    console.log(data);
    this.userList = data;
  });

  NoteslistRefresh = () => this.service.GetNotes(this.ingegevenNaamToevoegen).subscribe((data: Array<Notes>) => {
    console.log(data);
    this.notesList = data;
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

  EditNoteView = (addNoteforUser:string, categorie: string, content: string) => {
    this.ingegevenNaamToevoegen = addNoteforUser;
    this.ingegevenCategoryToevoegen = categorie;
    this.ingegevenNoteToevoegen = content;
    this.service.DeleteNote(this.ingegevenNoteToevoegen, this.ingegevenNaamToevoegen).subscribe((response) =>{
    console.log(response);
    });
    this.editNote = true;
    this.addNote = false;
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

  EditNoteComponent = () => {
    
    this.service.AddNote(this.ingegevenNoteToevoegen, this.ingegevenCategoryToevoegen, this.ingegevenNaamToevoegen).subscribe((response) => {
      console.log(response);
      this.UserlistRefresh();
      this.editNote = false;
    });
  }

  AddNoteComponent = () => {
    this.service.AddNote(this.ingegevenNoteToevoegen, this.ingegevenCategoryToevoegen, this.ingegevenNaamToevoegen).subscribe((response) => {
      console.log(response);
      this.UserlistRefresh();
      this.addNote = false;
    });
  }

  ShowNoteComponent = (addNoteforUser:string) => {
      this.ingegevenNaamToevoegen = addNoteforUser;
      this.service.GetNotes(this.ingegevenNaamToevoegen).subscribe((data: Array<Notes>) => {
      console.log(data);
      this.notesList = data;
      this.dataSource = new MatTableDataSource<Notes>(this.notesList);
      this.showNote = true;
      this.addNote = false;
      this.addUser = false;
    });
  }

  DeleteNoteComponent = (note: string) => {
    this.service.DeleteNote(note, this.ingegevenNaamToevoegen).subscribe((response) =>{
      this.ingegevenNaamToevoegen = "";
      this.showNote = false;
      this.NoteslistRefresh();
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