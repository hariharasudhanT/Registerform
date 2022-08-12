import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  header: string = "Register Form";
  registerform: FormGroup | any;
  submitted: boolean = false;
  stateList: any;
  blockSpace: RegExp = /^([A-z]*\\s)*/;
  blockSpecial: RegExp = /^[^<>*!]+$/;
  // phoneRegExp: RegExp = ;
  Hobbieslist: any;
  Hobbies: any[] = [];
  HobbiesStringlist: any;
  districtlist: any;
  citylist: any;
  dataType: any = 'password';
  phonevalid = false
  get form() {
    return this.registerform.controls;
  }

  constructor(private fb: FormBuilder, private Api: AccountService, public datepipe: DatePipe, private router: Router, private messageService: MessageService) {
  }

  numberOnly(event?: any): any {
    if (
      (event?.keyCode >= 48 && event?.keyCode <= 57) ||
      (event?.keyCode >= 96 && event?.keyCode <= 105) ||
      event?.keyCode == 8 ||
      event?.keyCode == 37 ||
      event?.keyCode == 39 ||
      event?.keyCode == 46 ||
      event?.keyCode == 13 ||
      event?.keyCode == 9
    ) {
      return true;
    }
    event.preventDefault();
  }

  phone(event?: any): any {
    console.log("event",event);
    
    let phone = [];
    if (this.registerform.get('c_mobile_no').value != undefined) {
      phone.push(this.registerform.get('c_mobile_no').value);
      if (phone[0] < 6) {
    
        this.registerform.get('c_mobile_no').patchValue('');
        this.registerform.get('c_mobile_no').updateValueAndValidity();
        phone = [];
      }
      console.log('ewr', this.registerform.get('c_mobile_no').value);
    }
  }

  ngOnInit() {
    this.registerform = this.fb.group({
      'c_name': ["", Validators.required],
      'n_dob': ["", Validators.required],
      'c_gender': ["", Validators.required],
      'n_state': ["", Validators.required],
      'n_district': ["", Validators.required],
      'n_city': ["", Validators.required],
      'n_pincode': ["", Validators.required],
      'c_address': ["", Validators.required],
      'c_mobile_no': ["", Validators.required],
      'c_emailid': ["", Validators.required],
      'c_hobbies': ["", Validators.required],
      'c_image': ["", Validators.required],
      'c_password': ["", Validators.required],
    });

    this.Api.statelist().subscribe(res => {
      console.log('state', res);
      this.stateList = res;
    });


    this.Api.Hobbieslist().subscribe(res => {
      console.log('Hobbieslist', res);
      this.Hobbieslist = res;
    });
  }

  onClickHandler(data: any, status: boolean) {
    console.log(data, status);
    if (status == true) {
      this.Hobbies.push(data);
    } else {
      const newArr = this.Hobbies.filter((object: any) => {
        return object !== data;
      });
      this.Hobbies = newArr;
    }

    const resultArr = this.Hobbies.reduce((acc: any, item: any) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);

    this.Hobbies = resultArr;
    this.HobbiesStringlist = this.Hobbies.toString().replace(",", ", ");
    console.log("list", this.HobbiesStringlist);

  }

  stateChanged() {
    this.stateList?.data?.map((res: any) => {
      if (res.state_name == this.registerform.get('n_state').value) {
        this.Api.districtlist(res?.state_id).subscribe(res => {
          console.log('districtlist', res);
          this.districtlist = res;
        });
      }
    });
  }

  districtChanged() {
    this.districtlist?.data?.map((res: any) => {
      if (res.district_name == this.registerform.get('n_district').value) {
        this.Api.citylist(res?.district_id).subscribe(res => {
          console.log('citylist', res);
          this.citylist = res;
        });
      }
    });
  }


  onSubmit() {
    this.submitted = true;

    this.registerform.get('c_hobbies').patchValue(this.HobbiesStringlist);
    this.registerform.get('c_hobbies').updateValueAndValidity();
    if (this.registerform.get('n_dob').value) {
      let date = this.datepipe.transform(this.registerform.get('n_dob').value, 'yyyy-MM-dd');
      this.registerform.get('n_dob').patchValue(date);
      this.registerform.get('n_dob').updateValueAndValidity();
    }
    console.log("submit", this.registerform);
    if (this.registerform.valid) {
      this.Api.register(this.registerform.value).subscribe((res: any) => {
        if (res.status == 1) {
          this.router.navigateByUrl("/login")
        } else if (res.status == 0) {
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: res.message
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error',
        detail: 'Please fill all required fields.'
      });
    }
  }


}
