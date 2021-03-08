import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule }  from '@angular/material/select';
import { MatButtonModule }  from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { InfobarComponent } from './infobar/infobar.component';
import { FieldComponent } from './field/field.component';
import { ResultComponent } from './result/result.component';
import { StartpageComponent } from './startpage/startpage.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    InfobarComponent,
    FieldComponent,
    ResultComponent,
    StartpageComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
