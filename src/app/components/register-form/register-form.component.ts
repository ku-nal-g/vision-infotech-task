import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallsService } from 'src/app/services/api-calls.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerForm!: FormGroup;
  hobbiesList: any = [];

  cities = ['Delhi', 'Gujrat', 'Mumbai', 'Patna', 'Gurgaon', 'Hyderabad', 'Bangalore'];

  isSubmitted = false;

  base64textString:String="";

  constructor(private fb: FormBuilder, private router: Router, private apiCall: ApiCallsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
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
    return this.registerForm.get('fname');
  }
  get lname() {
    return this.registerForm.get('lname');
  }

  get age() {
    return this.registerForm.get('age');
  }
  get gender() {
    return this.registerForm.get('gender');
  }
  get hobbies() {
    return this.registerForm.get('hobbies');
  }
  get city() {
    return this.registerForm.get('city');
  }
  get photo() {
    return this.registerForm.get('photo');
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
  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      let reqObj = {
        firstName: this.registerForm.value.fname,
        lastName: this.registerForm.value.lname,
        age: this.registerForm.value.age,
        gender: this.registerForm.value.gender,
        city: this.registerForm.value.city,
        hobbies: this.hobbiesList,
        photo: this.base64textString,
      }
      this.apiCall.postData(reqObj).subscribe((res) => {
        this.toastr.success('Sucess', 'User added successfully!');
        this.router.navigate(['/show-users']);
      },
        (error) => {
          this.toastr.error("an error has occured");
        }
      )
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
}
