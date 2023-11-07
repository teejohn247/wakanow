import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule }  from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { FullCalendarModule } from '@fullcalendar/angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { AssetsTableComponent } from './components/assets-table/assets-table.component';
import { CreateAssetComponent } from './components/create-asset/create-asset.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthGuard } from './components/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './components/auth/auth.service';
import { EditAssetComponent } from './components/edit-asset/edit-asset.component';
import { ConfirmationDialogComponent } from './components/assets-table/confirmation.component';

// FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    AssetsTableComponent,
    CreateAssetComponent,
    EditAssetComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // FullCalendarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    // MatSelectModule,
    MatTableModule,
    HttpClientModule,
    // MatProgressBarModule,
    // MatExpansionModule,
    // HighchartsChartModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
