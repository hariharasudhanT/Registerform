import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AccountService {
    private options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    login(username: any, password: any) {
        let body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);

        return this.http.post(`https://www.datasense.in/demo/beta_task/index.php/task/api/login`,
            body.toString(), this.options)
    }

    statelist() {
        return this.http.get(`https://www.datasense.in/demo/beta_task/index.php/task/api/state`);
    }

    districtlist(id: any) {
        let body = new URLSearchParams();
        body.set('state_id', id);

        return this.http.post(`https://www.datasense.in/demo/beta_task/index.php/task/api/district`,  body.toString(), this.options);
    }

    citylist(id: any) {
        let body = new URLSearchParams();
        body.set('district_id', id);

        return this.http.post(`https://www.datasense.in/demo/beta_task/index.php/task/api/city`,  body.toString(), this.options);
    }


    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    register(user: any) {
        var formData: any = new FormData();
        formData.append('c_name', user?.c_name);
        formData.append('c_password', user?.c_password);
        formData.append('c_address', user?.c_address);
        formData.append('c_emailid', user?.c_emailid);
        formData.append('c_gender', user?.c_gender);
        formData.append('n_state', user?.n_state);
        formData.append('c_image', user?.c_image);
        formData.append('c_mobile_no', user?.c_mobile_no);
        formData.append('n_city', user?.n_city);
        formData.append('n_district', user?.n_district);
        formData.append('n_dob', user?.n_dob);
        formData.append('n_pincode', user?.n_pincode);
        formData.append('c_hobbies', user?.c_hobbies);
        return this.http.post(`https://www.datasense.in/demo/beta_task/index.php/task/api/register`, formData);
    }

    Hobbieslist() {
        return this.http.get(`https://www.datasense.in/demo/beta_task/index.php/task/api/hobbies`);
    }

    forgot(emailId: any) {
        let body = new URLSearchParams();
        body.set('c_emailid', emailId);

        return this.http.post(`https://www.datasense.in/demo/beta_task/index.php/task/api/send_otp`,  body.toString(), this.options);
    }

    forgotChange(data:any){
        let body = new URLSearchParams();
        body.set('otp_value', data?.otp_value);
        body.set('c_emailid', data?.otp_value);
        body.set('c_password', data?.c_password);
        body.set('con_password', data?.con_password);

        return this.http.post(`https://www.datasense.in/demo/beta_task/index.php/task/api/forgot`,  body.toString(), this.options);
    }

    ProfileList(data:any){
        let body = new URLSearchParams();
        body.set('limit', data?.limit);
        body.set('offset', data?.offset);
        body.set('page', data?.page);

        return this.http.post(`https://www.datasense.in/demo/beta_task/index.php/task/api/list`,  body.toString(), this.options);
    }

}