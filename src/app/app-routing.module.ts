import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { GemsComponent } from './gems/gems.component';
import { StakeCountComponent } from './stake-count/stake-count.component';
import { StakeComponent } from './stake/stake.component';

const routes: Routes = [
  {
    path: '',
    component: StakeCountComponent,
    pathMatch: 'full'
  },
  {
    path: 'stake',
    component: StakeComponent,
    pathMatch: 'full'
  },
  {
    path: 'gems',
    component: GemsComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full'
  },
  {
    // wildcard routing?
    path: '**',
    component: StakeComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
