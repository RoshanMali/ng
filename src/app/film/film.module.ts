import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './film.component';
import { DemoMaterialModule } from '../material-module';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: FilmComponent }
];


@NgModule({
  declarations: [
    FilmComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class FilmModule { }
