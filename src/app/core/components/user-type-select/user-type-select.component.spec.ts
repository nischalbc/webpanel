import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeSelectComponent } from './user-type-select.component';
import {FormGroup} from '@angular/forms';

describe('UserTypeSelectComponent', () => {
  let component: UserTypeSelectComponent;
  let fixture: ComponentFixture<UserTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeSelectComponent ]
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
});
