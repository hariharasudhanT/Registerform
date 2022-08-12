import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ForgotComponent } from './component/forgot/forgot.component';
import { SendotpComponent } from './component/sendotp/sendotp.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {KeyFilterModule} from 'primeng/keyfilter';
import { DatePipe } from '@angular/common';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { NgxOtpInputModule } from 'ngx-otp-input';
import {ToastModule} from 'primeng/toast';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import {TableModule} from 'primeng/table';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotComponent,
    SendotpComponent,
    DashboardComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    PasswordModule,
    KeyFilterModule,
    NgxOtpInputModule,
    ToastModule,
    TableModule
  ],
  exports: [
    RouterModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [SendotpComponent],
  providers: [DatePipe,DialogService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
