import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user.interface';
import { DataService } from '../data.service';
import { treeFeaturesFactory } from '@clr/angular/data/tree-view/tree-features.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  form: FormGroup;
  submitted = false;
  next = false;
  result: any;

  email = '';
  mobile = '';
  name = '';

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {

  }
  validateEmail(email) {
    const response = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return response.test(String(email).toLowerCase());
  }
  validateMobile(value) {
    return value.match(/^\d{10}$/);
  }
  submit() {
    console.log('reactive form submit', this.form.value);
  }

  ngOnInit() {
  }

  newUser() {
    this.user = {
      name: this.name,
      email: this.email,
      mobile: this.mobile
    };
    this.dataService.AddNewUser(this.user)
      .subscribe(
        res => {
          this.next = true;
          setTimeout(() => {
            this.next = false;
          }, 1000);

          if (this.user.mobile !== '') {
            this.result = {
              name: res.userReqData.name,
              email: res.userReqData.email,
              mobile: res.userReqData.mobile
            };
            this.getUserDetails(res.userReqData.email);
            this.submitted = true;
          }
        }, err => {
          console.log('Error found:', err);
        }
      );
  }

  getUserDetails(email) {
    this.dataService.getUserDetails(email)
    .subscribe(
      res => {
        this.result = {
          name: res.result.name,
          email: res.result.email,
          mobile: res.result.mobile
        };
      }
    );
  }

  reset() {
    this.ngOnInit();
    this.email = '';
    this.mobile = '';
    this.name = '';
    this.submitted = false;
  }

}
