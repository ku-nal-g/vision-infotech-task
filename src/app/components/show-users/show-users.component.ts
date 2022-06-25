import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {

  studentData:any = [];
  deleteIndex = -1;
  deleteUserName:String = '';
  updateIndex = -1;

  updateForm!: FormGroup;
  hobbiesList: any = [];

  cities = ['Delhi', 'Gujrat', 'Mumbai', 'Patna', 'Gurgaon', 'Hyderabad', 'Bangalore'];

  isSubmitted = false;

  base64textString:String="";

  constructor(private apiCall :ApiCallsService,private fb:FormBuilder,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.apiCall.getData().subscribe((res)=>{
      this.studentData = res.data;
      this.toastr.success("Success",'Detils fetched')
    },
    (error) =>{
      this.toastr.error("An error has occured");
    })
    this.createForm();
  }

  createForm(){
    this.updateForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      age: ['', Validators.required],
      hobbies: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      photo: ['', Validators.required]
    });

  }

  get fname() {
    return this.updateForm.get('fname');
  }
  get lname() {
    return this.updateForm.get('lname');
  }

  get age() {
    return this.updateForm.get('age');
  }
  get gender() {
    return this.updateForm.get('gender');
  }
  get hobbies() {
    return this.updateForm.get('hobbies');
  }
  get city() {
    return this.updateForm.get('city');
  }
  get photo() {
    return this.updateForm.get('photo');
  }


  getValue(num: number, $event: any) {
    if (num == 1) {
      this.hobbiesList.push('Reading');
    }
    else if (num == 2) {
      this.hobbiesList.push('Singing');
    }
    else {
      this.hobbiesList.push('Dancing');
    }
  }

  handleFileSelect(evt:any){
    var files = evt.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt:any) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
  }

  onSubmit() {
    let id = this.updateIndex + '';
    this.isSubmitted = true;
    if (this.updateForm.valid) {
      let reqObj = {
        firstName: this.updateForm.value.fname,
        lastName: this.updateForm.value.lname,
        age: this.updateForm.value.age,
        gender: this.updateForm.value.gender,
        city: this.updateForm.value.city,
        hobbies: this.hobbiesList,
        photo: this.base64textString,
      }
      this.apiCall.putData(id,reqObj).subscribe((res) => {
        this.toastr.success('Sucess', 'User updated successfully!');
      },
        (error) => {
          this.toastr.error("An error has occured");
        }
      )
    }
  }

  getDeleteIndex(id:number){
    this.deleteIndex = id;
    this.deleteUserName = this.studentData[id].firstName;
  }
  deleteUser(){
    let id = this.deleteIndex + '';
    this.apiCall.deleteData(id).subscribe((res)=>{
      this.toastr.success("Success", 'User deleted successfully');
    },
    (error)=>{
      this.toastr.error("An error has occured");
    })
  }
  getUpdateIndex(id:number){
    this.updateIndex = id;
  }

}
