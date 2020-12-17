import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamEditComponent} from './team-edit/team-edit.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamBoxComponent } from './team-box/team-box.component';
import { PlayerBoxComponent } from './player-box/player-box.component';
import { DragulaModule } from 'ng2-dragula';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UrlValidatorDirective } from './directives/url-validator.directive';

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
    ReactiveFormsModule,
    DragulaModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
