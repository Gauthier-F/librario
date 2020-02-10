import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConnectionComponent } from './connection/connection.component';
import { WishlistComponent } from './documents/wishlist/wishlist.component';
import { DoclistComponent } from './documents/doclist/doclist.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const Routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'wish', component: WishlistComponent },
  { path: 'collection', component: DoclistComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ConnectionComponent,
    WishlistComponent,
    DoclistComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
