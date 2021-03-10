import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartpageComponent } from './startpage/startpage.component';

const routes: Routes = [
  // Über /game wird die Game Seite angezeigt, 
  // die zwei Sterne sind ein Platzhalter der zeigt, 
  // das alles andere was hinter der HauptURL steht
  // (das nicht /game ist)zur Startpage führt
  {path: 'game', component: GameComponent},
  {path: '**', component: StartpageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
