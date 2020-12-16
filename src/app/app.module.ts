import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamEditComponent, UrlValidatorDirective } from './team-edit/team-edit.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamBoxComponent } from './team-box/team-box.component';
import { PlayerBoxComponent } from './player-box/player-box.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamEditComponent,
    TeamViewComponent,
    TeamBoxComponent,
    UrlValidatorDirective,
    PlayerBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
