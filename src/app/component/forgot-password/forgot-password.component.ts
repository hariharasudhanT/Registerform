import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [MessageService]
})
export class ForgotPasswordComponent implements OnInit {
  header = "Forgot Password"
  ForgotPasswordform: FormGroup | any;
  submitted: boolean = false;
  dataTypepd = "password";
  dataTypeCpd = "password";
  blockSpace: RegExp = /[^\s]/; 

  constructor(
    private fb: FormBuilder,
    private Api: AccountService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.ForgotPasswordform = this.fb.group({
      'c_emailid': ['', Validators.required],
      'c_password': ['', Validators.required],
      'con_password': ['', Validators.required],
      'otp_value': ['', Validators.nullValidator],
    });
    var otp = sessionStorage.getItem('otp')
    this.ForgotPasswordform.get('otp_value').patchValue(otp);
    this.ForgotPasswordform.get('otp_value').updateValueAndValidity();
  }

  submit() {
    if (this.ForgotPasswordform.valid) {
      this.Api.forgotChange(this.ForgotPasswordform.value).subscribe((res: any) => {
        if (res.status == 1) {
          this.router.navigateByUrl("/login")
        } else if (res.status == 0) {
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: res.message
          });
        }
      })
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error',
        detail: 'Please fill all required fields'
      });
    }
  }

}
