import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './products/product-detail.guard';

@NgModule({ // Declare the main module in the application, there can be other sub modules as well
  declarations: [// Contains names of all the Components, Pipes but not guards  in the entire application
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    WelcomeComponent
  ],
  bootstrap: [AppComponent], // the startup component which has to be placed in the root index.html
  imports: [ // Contains all the angular modules used
    BrowserModule, // this is compulsory to render in browser
    FormsModule, // for using ngModel directive
    HttpClientModule, // for making http calls
    // The routes are matched in the given order
    RouterModule.forRoot([ // for routing, the forRoot method contains the array of all the possible routes
      { path: 'products', component: ProductListComponent }, // if the path matches render the component in the 'router-outlet'
      { path: 'products/:id',  // id is a parameter
      component: ProductDetailComponent,
      canActivate: [ProductDetailGuard] }, // guard for activation
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }, // if path is blank and is full match redirect to welcome route
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' } // ** means wildcard, if none of the above matches use this
    ])
  ]
})
export class AppModule { }
