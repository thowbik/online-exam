import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserSessionService } from 'src/services/usersession.service';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT, DatePipe } from '@angular/common';
// import { NavigationService } from 'services/navigation.service';
import {environment} from '../../../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  pipe = new DatePipe('en-US');
  loginForm: FormGroup;
  returnUrl: string;
  schoolTypeId: number;
  @ViewChild('test', { static: false }) test: ElementRef;
  date: any;
  constructor(private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute, 
    private navigationService: NavigationService,
    private userSessionService : UserSessionService,
    public toastr: ToastrService,
  ) {
   
    debugger;
    // this.schoolTypeId = this.userSessionService.schoolId();
  }

  ngOnInit() {
    this.date =  this.pipe.transform(new Date(),'dd-MM-yyyy');
    this.authService.logOut();
    this.initializeValidators();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//     // this.test.nativeElement.click();
//     let element: HTMLElement = document.getElementsByClassName('test')[0] as HTMLElement;
// element.click();
  }
  fullScreen() {
    let elem = document.documentElement;
    debugger;
    let methodToBeInvoked = elem.requestFullscreen ||
      elem['webkitRequestFullScreen'] || elem['mozRequestFullscreen']
      ||
      elem['msRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
  }

  initializeValidators() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    debugger;
    if(window.navigator.onLine) {
     if (this.loginForm.valid) {
//         if (this.loginForm.value.email.indexOf('_') > -1)
// {
//   alert("_ is present");
// }
// else {
//   alert("_ is absent");
// }
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data) => {
        debugger;
        if(data.dataStatus) {
      debugger;
            // this.router.navigate(['/dashboard']);
            this.router.navigate([this.returnUrl])
              
        }
        else {
          this.toastr.error(data.message);
        }
       
      });
    // } else {
    //   this.validateFormControl();
     }
     else {
      this.toastr.error('Please Enter Username and Password'); 
     }
  }
  else {
    this.toastr.error('Please Check the Internet Connection');
  }

  }

  validateFormControl() {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

//   fullScreen() {
//     let elem = document.documentElement;
//     let methodToBeInvoked = elem.requestFullscreen ||
//       elem['webkitRequestFullScreen'] || elem['mozRequestFullscreen']
//       ||
//       elem['msRequestFullscreen'];
//     if (methodToBeInvoked) methodToBeInvoked.call(elem);
// }
  // On registration link click
  onRegister() {
    this.router.navigate(['/register']);
  }

}
