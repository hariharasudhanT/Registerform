import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sendotp',
  templateUrl: './sendotp.component.html',
  styleUrls: ['./sendotp.component.scss']
})
export class SendotpComponent implements OnInit {
  @ViewChild('ngxotp') ngxOtp: NgxOtpInputComponent | any;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: "my-super-box-class",
      input: "my-super-class",
      inputFilled: "my-super-filled-class",
      inputDisabled: "my-super-disable-class",
      inputSuccess: "my-super-success-class",
      inputError: "my-super-error-class"
    }
  };
  validateButton: boolean = true;
  otpValue:any;
  timerOn=true;
  timer: any ;
  resendOtpshow: boolean = false;
  constructor(private ref: DynamicDialogRef,private Api: AccountService) { 

  }

  ngOnInit(): void {
    this.timersecond(30);
  }

  timersecond(remaining:any) {
    var s = remaining % 60 < 10 ? '0' + remaining % 60 : remaining % 60;
   this.timer =  s;
    remaining -= 1;
    if(remaining >= 0 && this.timerOn) {
      setTimeout((res:any)=> {
        this.resendOtpshow = false;
        this.timersecond(remaining);
      }, 1000);
      return;
    }
  
    if(!this.timerOn) {
      return;
    }
    
  this.resendOtpshow = true;
  }
  
  cancel() {
    this.ref.close();
  }

  onOtpChange(otp:any){
    this.otpValue = otp.join("");
  }

  resend(){
    this.timersecond(30);
    var email = sessionStorage.getItem('email');
    this.Api.forgot(email).subscribe((res: any) => {
      console.log("otp", res);
    })
  }

  submit(){
    this.ref.close(this.otpValue);
  
  }

}

