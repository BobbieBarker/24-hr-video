import { ModuleWithProviders, NgModule } from '@angular/core';

import { LoginComponent, AuthService } from './index';

import { MdToolbarModule, MdIconModule, MdButtonModule, MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    MdToolbarModule,
    MdIconModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MatTooltipModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule
    };
  }
}
