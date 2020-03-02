import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeSelectComponent } from './user-type-select.component';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../services/user/user.service';

describe('UserTypeSelectComponent', () => {
    let component: UserTypeSelectComponent;
    let fixture: ComponentFixture<UserTypeSelectComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        declarations: [ UserTypeSelectComponent],

      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserTypeSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('raises the selected event when selected', () => {
        const data = { target: { value: 'basic' } }
        component.onTypeSelect(data);
    });
});
