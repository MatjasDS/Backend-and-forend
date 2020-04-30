import { Component } from '@angular/core';
import { APIService } from './api.service';

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
  service: APIService;
  ingegevenNaamToevoegen: string;
  displayedColumnsUsers: string[] = ['name','remove']; 


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
      this.addUser=true;
  }

  AddUserComponent = () => {
    this.service.AddUser(this.ingegevenNaamToevoegen).subscribe((response) => {
      console.log(response);
      this.UserlistRefresh();
    });
    
  }

  DeleteUserAndNotesComponent = (removeName: string) => {
      this.service.DeleteUserAndNotes(removeName).subscribe((response) => {
        this.ingegevenNaamToevoegen = "",
          this.UserlistRefresh();
      });
  }

  
}
