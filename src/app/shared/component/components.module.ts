import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinnercomponent/spinner.component';

export const components = [
  SpinnerComponent
];

@NgModule({
  declarations: [components],
  imports: [],
  exports: [components],

})
export class ComponentsModule { }
