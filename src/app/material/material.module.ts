import { MatPaginatorImpl } from './mat-paginator';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatSortModule, MatDialogModule, MatSnackBarModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatMenuModule, MatDividerModule, MatInputModule, MatTableModule, MatPaginatorModule, MatCardModule, MatPaginatorIntl} from '@angular/material';

@NgModule({  
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorImpl }
  ]  
})
export class MaterialModule { }
