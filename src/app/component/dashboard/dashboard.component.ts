import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  header = "Dashboard";
  cols: any;
  profileData: any[] = [];
  @ViewChild('dataTable') private dataTable: any;
  
  constructor(private Api: AccountService) {
    var response = {
      limit: 8,
      offset: 1,
      page: 1
    }
    this.Api.ProfileList(response).subscribe((res: any) => {
      this.profileData = res?.data;
    })
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'c_name', header: 'Name', width: '70px' },
      { field: 'c_gender', header: 'Gender', width: '10px' },
      { field: 'n_dob', header: 'DOB', width: '50px' },
      { field: 'c_mobile_no', header: 'Mobile No', width: '70px' },
      { field: 'c_emailid', header: 'Email', width: '50px' },
      { field: 'c_image', header: 'Image', width: '100px' },
      { field: 'c_hobbies', header: 'Hobbies', width: '60px' },
      { field: 'c_address', header: 'Address', width: '60px' },
      { field: 'n_state', header: 'State', width: '30px' },
      { field: 'n_district', header: 'District', width: '30px' },
      { field: 'n_city', header: 'City', width: '30px' },
      { field: 'n_pincode', header: 'Pincode', width: '20px' }
    ];

  }

}
