import { Component, OnInit } from '@angular/core';
import {InAppRoutes, LocalStorageKeys} from '../../core/app-constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    private showError = false;
    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        // Remove if there is an
        localStorage.removeItem(LocalStorageKeys.USER_TYPE);
        localStorage.removeItem(LocalStorageKeys.IP_ADDRESSES);
    }

    submit() {
        const self = this;
        this.router.navigateByUrl(InAppRoutes.CONFIG)
          .then((isNavigated) => {
              if (!isNavigated) {
                  self.showError = true;
              }
          });
    }

    onUsertypeSelect(event: string) {
        this.showError = false;
        localStorage.setItem(LocalStorageKeys.USER_TYPE, event);
    }
}
