import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import {IpConfigurationComponent} from './pages/ip-configuration/ip-configuration.component';
import {FeatureGuard} from './core/guards/feature.guard';

const routes: Routes = [
    {
        path: 'landing',
        component: LandingComponent
    }, {
        path: 'config',
        canActivate: [FeatureGuard],
        component: IpConfigurationComponent
    },


    {path: '', redirectTo: 'landing', pathMatch: 'full'},
    {path: '**', redirectTo: 'landing', pathMatch: 'full'}
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule { }
