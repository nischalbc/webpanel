import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpConfigurationComponent } from './ip-configuration.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('IpConfigurationComponent', () => {
    let component: IpConfigurationComponent;
    let fixture: ComponentFixture<IpConfigurationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [ReactiveFormsModule],
          declarations: [ IpConfigurationComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IpConfigurationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return a boolean', () => {
      expect(component.canSave()).toBeFalsy();
    });
});
