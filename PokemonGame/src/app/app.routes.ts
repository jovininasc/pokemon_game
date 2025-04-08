import { mapToCanActivate, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './auth/components/home/home.component';
import { PokedexComponent } from './auth/components/pokedex/pokedex.component';

import { CaptureComponent } from './auth/components/capture/capture.component';
import { RegisterPokemonComponent } from './auth/components/register-pokemon/register-pokemon.component';
import { ConfigAdminComponent } from './auth/components/config-admin/config-admin.component';
import { authGuard } from './auth/guard/auth.guard';
import { adminGuard } from './auth/guard/admin.guard';
import { combineGuardGuard } from './auth/guard/combine-guard.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [combineGuardGuard] },
    { path: 'pokedex', component: PokedexComponent, canActivate: [authGuard] },
    { path: 'capture', component: CaptureComponent, canActivate: [authGuard] },
    { path: 'register-pokemon', component: RegisterPokemonComponent, canActivate: [adminGuard] },
    { path: 'config-admin', component: ConfigAdminComponent, canActivate: [adminGuard] }

];
