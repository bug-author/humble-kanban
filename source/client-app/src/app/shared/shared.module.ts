import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// add here common imports from angular material
const angularMaterialModules = [
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, ...angularMaterialModules],
  exports: [CommonModule, ReactiveFormsModule, ...angularMaterialModules],
})
export class SharedModule {}
