import { Injectable } from '@angular/core';
import {UserTypeModel} from '../../../models/user-type.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor() { }

    getUserTypes(): UserTypeModel[] {
        return [
            new UserTypeModel({label: 'Basic', value: 'basic', allowedIps: 5}),
            new UserTypeModel({label: 'Premium', value: 'premium', allowedIps: 10})
        ];
    }

}
