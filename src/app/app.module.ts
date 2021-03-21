
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './shared/header/header.component';
import { ComponentsModule } from './shared/component/components.module';
import { Observable } from 'rxjs';
import { SpinnerComponent } from './shared/component/spinnercomponent/spinner.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgHttpLoaderModule } from 'ng-http-loader';
 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarService } from 'src/services/navbar.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserSessionService } from 'src/services/usersession.service';
import { NavigationService } from 'src/services/navigation.service';
import { DataService } from 'src/services/data.service';
import { HttpInterceptorService } from 'src/services/interceptor.service';
import { ExamService } from './pages/full-layout-page/exam/exam.service';
 
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent,HeaderComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    BrowserModule,
    //NgbModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgHttpLoaderModule.forRoot(),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: createTranslateLoader,
    //     deps: [HttpClient]
    //   }
    // }),
  
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserSessionService,
    NavigationService,
    DataService,
    NavBarService,
    ExamService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  
  bootstrap: [AppComponent],
  entryComponents:
    [
      SpinnerComponent
    ]
})
export class AppModule { }
