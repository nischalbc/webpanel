import { Injectable } from '@angular/core';
import {UserTypeModel} from '../../../models/user-type.model';
import {LocalStorageKeys} from '../../app-constants';
import {IpConfigurationModel} from '../../../models/ip-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private userTypes: UserTypeModel[] = [];
    constructor() {

        this.userTypes = [
          new UserTypeModel({label: 'Basic', value: 'basic', allowedIps: 5}),
          new UserTypeModel({label: 'Premium', value: 'premium', allowedIps: 10})
        ];
    }

    getUserTypes(): UserTypeModel[] {
        return this.userTypes;
    }

    getAllowedIPs(type: string): UserTypeModel {
        const userTypeObject = this.userTypes.find((userType) => userType.value === type);
        if (userTypeObject !== undefined) {
          return userTypeObject;
        }
    }

    saveIpAddresses(data: IpConfigurationModel[]): void {

        const ipList: IpConfigurationModel[] = data.filter(item => item.ipValue !== '');
        const ipListString: string = JSON.stringify(ipList);
        localStorage.setItem(LocalStorageKeys.IP_ADDRESSES, ipListString);
    }
}
