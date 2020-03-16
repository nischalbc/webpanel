import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ALLOWED_IPS, LocalStorageKeys} from '../../core/app-constants';
import {UserService} from '../../core/services/user/user.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IpConfigurationModel} from '../../models/ip-configuration.model';

const MIN_ITEM = 1;
const IP_ADDR_PATTERN = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const IP_LIST_DICT = 'ipList';

@Component({
  selector: 'ip-configuration',
  templateUrl: './ip-configuration.component.html',
  styleUrls: ['./ip-configuration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IpConfigurationComponent implements OnInit {

    private ipLimit = ALLOWED_IPS;
    configForm: FormGroup;
    originalData: IpConfigurationModel[] = [];
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
        this.configForm = this.fb.group(self.initializeIpListControl());
        this.originalData.push(this.configForm.get(IP_LIST_DICT).value);
    }

    initializeIpListControl() {
      const self = this;
      const control = {};
      control[IP_LIST_DICT] = this.fb.array([
        self.ipValueFormGroup()
      ]);
      // return {
      //   ipList: this.fb.array([
      //     self.ipValueFormGroup()
      //   ])
      // };
      return control;
    }

    ipValueFormGroup(value = null): FormGroup {
        const initialValue = (value !== null) ? value : '';
        return this.fb.group({ ipValue: [initialValue, [Validators.pattern(IP_ADDR_PATTERN)]] });
    }

    get ipList(): FormArray {
        return this.configForm.get(IP_LIST_DICT) as FormArray;
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
          this.configForm.get(IP_LIST_DICT).markAsDirty();
        }
    }

    /**
     *  @description Saves the Data.
     */
    saveIpAddress(): void {
        if (this.canSave()) {
            this.userService.saveIpAddresses(this.configForm.get(IP_LIST_DICT).value);
            this.originalData = this.configForm.get(IP_LIST_DICT).value;
            this.configForm.get(IP_LIST_DICT).markAsPristine();
        }
    }

    canSave(): boolean {

        return ((this.originalData.length !== this.configForm.get(IP_LIST_DICT).value.length
          || this.configForm.get(IP_LIST_DICT).dirty)
          && this.configForm.get(IP_LIST_DICT).valid);
    }

    /**
     *  @description Loads the data.
     */
    loadData(): void {

        const self = this;
        const data = localStorage.getItem(LocalStorageKeys.IP_ADDRESSES);
        if (data !== null) {
          this.originalData = JSON.parse(data);
          self.ipList.clear();
          this.originalData.forEach((res) => {
              const ipValueFb = self.ipValueFormGroup(res.ipValue);
              self.ipList.push(ipValueFb);
          });
        }
    }

}
