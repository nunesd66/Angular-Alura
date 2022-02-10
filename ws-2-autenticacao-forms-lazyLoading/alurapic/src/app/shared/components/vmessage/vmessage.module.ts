import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VMessageComponent } from './vmessage.component';

@NgModule({
  declarations: [VMessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    VMessageComponent
  ]
})
export class VMessageModule {}