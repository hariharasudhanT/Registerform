import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  header: string = "Login Form";
  userform: FormGroup | any;
  submitted: boolean = false;
  dataType = "password";
  blockSpace: RegExp = /[^\s]/; 
  Regex: RegExp = /[^\s\s/]/; 
  
  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private Api: AccountService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userform.valid) {
      this.Api.login(this.userform.value?.username, this.userform.value?.password).subscribe((user: any) => {
        if (user.status == 1) {
          this.router.navigateByUrl("/dashboard")
        } else if (user.status == 0) {
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: user.message
          });
        }
      })
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error',
        detail: 'Please fill all required fields.'
      });
    }
  }

}
