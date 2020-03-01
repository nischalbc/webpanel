import { Injectable } from '@angular/core';
import {UserTypeModel} from '../../../models/user-type.model';

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
}
