import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import { CanClickDirective } from './directives/can-click.directive';
import { InputFloatComponent } from './input-float/input-float.component';
import { InputFloatDirective } from './input-float/input-float.directive';
import { InputIntegerComponent } from './input-integer/input-integer.component';
import { IntegerValidatorDirective } from './input-integer/integer.validator.directive';
import { HostElementService } from './modal/host/host-element.service';
import { ModalComponent } from './modal/modal.component';
import { JoinPipe } from './pipes/join.pipe';

@NgModule({
  imports: [CommonModule, MatInputModule, FormsModule, MatCardModule, MatButtonModule, MatProgressBarModule],
  declarations: [
    CanClickDirective,
    InputIntegerComponent,
    IntegerValidatorDirective,
    JoinPipe,
    ModalComponent,
    InputFloatDirective,
    InputFloatComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputIntegerComponent,
    IntegerValidatorDirective,
    InputFloatDirective,
    InputFloatComponent,
    JoinPipe,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    CanClickDirective
  ],
  providers: [HostElementService],
  entryComponents: [ModalComponent]
})
export class SharedModule {}
