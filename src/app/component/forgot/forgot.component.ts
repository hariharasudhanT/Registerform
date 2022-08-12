import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'src/app/services/account.service';
import { SendotpComponent } from '../sendotp/sendotp.component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  providers: [MessageService]
})
export class ForgotComponent implements OnInit {
  header = "Forgot Password"
  Forgotform: FormGroup | any;
  submitted: boolean = false;
  ErrorMgsShow: boolean = false;


  constructor(
    private fb: FormBuilder, 
    private dialogService: DialogService, 
    private Api: AccountService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.Forgotform = this.fb.group({
      'c_emailid': ['', Validators.required],
    });
  }

  submit() {
    if (this.Forgotform.valid) {
      var email = this.Forgotform?.value?.c_emailid;
      sessionStorage.setItem('email', email);
      this.Api.forgot(this.Forgotform?.value?.c_emailid).subscribe((res: any) => {
        if (res.status == 1) {

          const ref = this.dialogService.open(SendotpComponent, {
            data: {
              title: ''
            },
            showHeader: false,
            width: '40%'
          });
          ref.onClose.subscribe((otp: any) => {
            console.log("otp", otp);
            sessionStorage.setItem('otp', otp);
            this.router.navigateByUrl("/forgot-change");
          });
          
        } else if (res.status == 0) {
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: res.message
          });
        }
      })
    }else{
      // this.router.navigateByUrl("/forgot-change");
      this.messageService.add({severity:'error', summary: 'Error', 
      detail: 'Please fill all required fields'});
    }
  }



}
