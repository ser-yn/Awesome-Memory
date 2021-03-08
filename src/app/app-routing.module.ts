import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartpageComponent } from './startpage/startpage.component';

const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path: '**', component: StartpageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
