import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { CovalentCoreModule, CovalentLayoutModule } from '@covalent/core';
import { SysDashboardComponent } from './@dashboard/sys-dashboard.component';
import { SysRoutingModule } from './sys-routing.module.';

@NgModule({
  declarations: [
    SysDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    CovalentCoreModule.forRoot(),
    CovalentLayoutModule.forRoot(),
    SysRoutingModule
  ]
})
export class SysModule {
   static forRoot() : ModuleWithProviders {
    return {
      ngModule: SysModule,
      providers: []
    }
  }
 }