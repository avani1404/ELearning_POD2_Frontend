import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Validators } from '@angular/forms';
import {  FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from '../connection.service';
import { User } from '../user';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  user: User = new User(0,"","","","",0,"","","");
  exform!: FormGroup;
  
  date:any ;
  age:any;
  xyz:any = 10;

  // roles:any=["Learner","Vendor"];
  // radioChangeHandler(event:any){
  //   this.user.role=event.target.value;
  // }



  //check:any;
  constructor(private fb: FormBuilder,private router: Router,private service : ConnectionService) { 
    this.createForm();
  }

  createForm(){
    this.exform = this.fb.group({
      'name' : new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'phone' : new FormControl(
      null,
      [
        Validators.required,
        Validators.pattern('^[1-9][0-9]{9}$')
      ]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'dob': new FormControl(null, Validators.required),
      'atc': new FormControl(false, [Validators.requiredTrue]),
      'address' : new FormControl(null, [Validators.required, Validators.minLength(10)]),
      // 'role': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    console.log(this.user);
    this.date = this.user.dob;
    var today = new Date();
    console.log("today:::: "+today);
    var birthDate = new Date(this.date);
    console.log(birthDate);
    this.age = today.getFullYear() - birthDate.getFullYear();
    console.log(this.age);
    var m = today.getMonth() - birthDate.getMonth();
    console.log(m);
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
       this.age--;
      
    }
    console.log(this.age);
    this.xyz=this.age;
    if(this.age > 18)
    {
      if(this.exform.status == "VALID" )
      {
        this.age="Wait Validating Your Detail!!"
        this.user.role="Vendor";
        this.user.status="Active";
        let reponse = this.service.doRegistration(this.user);
        reponse.subscribe(data => {
          this.age = data;
        });
        this.router.navigate(['register_sucessful']);
      return this.age;
      }
      else{
        this.age="Fill All the Details Correcty to Register.";
        return this.age;
      }
      
      
    }
    else{
      this.age="Fill the Correct details to Register.";
      //return this.age;
    }
  }

  ngOnInit(): void {
  }

}
