import { Component, OnInit } from '@angular/core';
import {LocalStorageKeys, ALLOWED_IPS} from '../../core/app-constants';
import {UserService} from '../../core/services/user/user.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'ip-configuration',
  templateUrl: './ip-configuration.component.html',
  styleUrls: ['./ip-configuration.component.css']
})
export class IpConfigurationComponent implements OnInit {

    private ipLimit = ALLOWED_IPS;
    configForm: FormGroup;
    constructor(private fb: FormBuilder, private userService: UserService) { }

    ngOnInit() {
        this.initializeData();
        this.initializeForm();
    }

    initializeData() {
        const userTypeValue = localStorage.getItem(LocalStorageKeys.USER_TYPE);
        const userType = this.userService.getAllowedIPs(userTypeValue);
        if (userType !== undefined) {
          this.ipLimit = userType.allowedIps;
        }

    }

    initializeForm() {
        /* Initiate the form structure */
        this.configForm = this.fb.group({
            ip_list: this.fb.array([
                this.fb.group({ ipValue: '' })
            ])
        });
    }

    get ipList() {
      return this.configForm.get('ip_list') as FormArray;
    }


    addIpAddress() {
        if (this.ipList.length <= this.ipLimit) {
            this.ipList.push(this.fb.group({ipValue: ''}));
        }
    }

    removeIpAddress(index) {
        this.ipList.removeAt(index);
    }


    saveIpAddress() {
        // Put the save logic here.
    }

}
