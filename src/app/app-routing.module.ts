import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import {IpConfigurationComponent} from './pages/ip-configuration/ip-configuration.component';
import {FeatureGuard} from './core/guards/feature.guard';
import {InAppRoutes} from './core/app-constants';

const routes: Routes = [
    {
        path: InAppRoutes.LANDING,
        component: LandingComponent
    }, {
        path: InAppRoutes.CONFIG,
        canActivate: [FeatureGuard],
        component: IpConfigurationComponent
    },


    {path: '', redirectTo: InAppRoutes.LANDING, pathMatch: 'full'},
    {path: '**', redirectTo: InAppRoutes.LANDING, pathMatch: 'full'}
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule { }
