import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserTypeModel} from '../../../models/user-type.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'user-type-select',
    templateUrl: './user-type-select.component.html',
    styleUrls: ['./user-type-select.component.css']
})
export class UserTypeSelectComponent implements OnInit {

    @Output() selectedUserType: EventEmitter<string> = new EventEmitter();
    userTypes: UserTypeModel[] = [];
    userTypeForm: FormGroup;

    constructor(private fb: FormBuilder, private userService: UserService) { }

    ngOnInit() {
        this.initializeData();
    }

    /**
     * @description Initialize the start data.
     */
    initializeData() {
        this.userTypes = this.userService.getUserTypes();
        this.userTypeForm = this.fb.group({
            userTypeControl: [this.userTypes[0]]
        });
    }

    /**
     * @description Triggers when the User Type is Changed
     *
     * @param Event Object sent.
     */
    onTypeSelect(event) {
        if (event.target !== null && event.target.value !== null) {
            this.selectedUserType.emit(event.target.value);
        }
    }

}
