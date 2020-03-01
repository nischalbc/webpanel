import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ALLOWED_IPS, LocalStorageKeys} from '../../core/app-constants';
import {UserService} from '../../core/services/user/user.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IpConfigurationModel} from '../../models/ip-configuration.model';

const MIN_ITEM = 1;
const IP_ADDR_PATTERN = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

@Component({
  selector: 'ip-configuration',
  templateUrl: './ip-configuration.component.html',
  styleUrls: ['./ip-configuration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IpConfigurationComponent implements OnInit {

    private ipLimit = ALLOWED_IPS;
    configForm: FormGroup;
    constructor(private fb: FormBuilder, private userService: UserService) { }

    ngOnInit() {
        this.initializeDataLimit();
        this.initializeForm();
        this.loadData();
    }

    initializeDataLimit(): void {
        const userTypeValue = localStorage.getItem(LocalStorageKeys.USER_TYPE);
        const userType = this.userService.getAllowedIPs(userTypeValue);
        if (userType !== undefined) {
          this.ipLimit = userType.allowedIps;
        }
    }

    initializeForm(): void {
        const self = this;
        /* Initiate the form structure */
        this.configForm = this.fb.group({
            ipList: this.fb.array([
                  self.ipValueFormGroup()
            ])
        });
    }

    ipValueFormGroup(value = null): FormGroup {
        const initialValue = (value !== null) ? value : '';
        return this.fb.group({ ipValue: [initialValue, [Validators.pattern(IP_ADDR_PATTERN)]] });
    }

    get ipList(): FormArray {
        return this.configForm.get('ipList') as FormArray;
    }


    addIpAddress(): void {
        const self = this;
        if (this.ipList.length < this.ipLimit) {
            this.ipList.push(
                self.ipValueFormGroup()
            );
        }
    }

    /**
     *  @description Removes an IP address
     *
     */
    removeIpAddress(index): void {
        if (this.ipList !== undefined && this.ipList.length > MIN_ITEM) {
          this.ipList.removeAt(index);
        } else {
          this.initializeForm();
        }
    }

    /**
     *  @description Saves the Data.
     */
    saveIpAddress(): void {
        if (this.canSave()) {
            this.userService.saveIpAddresses(this.configForm.get('ipList').value);
            this.configForm.get('ipList').markAsPristine();
        }
    }

    canSave(): boolean {
        return (this.configForm.get('ipList').dirty && this.configForm.get('ipList').valid);
    }

    /**
     *  @description Loads the data.
     */
    loadData(): void {

        const self = this;
        const data = localStorage.getItem(LocalStorageKeys.IP_ADDRESSES);
        let storedIPAddr: IpConfigurationModel[];
        if (data !== null) {
          storedIPAddr = JSON.parse(data);
          self.ipList.clear();
          storedIPAddr.forEach((res) => {
              const ipValueFb = self.ipValueFormGroup(res.ipValue);
              self.ipList.push(ipValueFb);
          });
        }
    }

}
