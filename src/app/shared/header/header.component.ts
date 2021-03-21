import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationService } from 'src/services/navigation.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserSessionService } from 'src/services/usersession.service';
import { NavBarService } from 'src/services/navbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService } from 'src/app/pages/full-layout-page/exam/exam.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  schoolName: any;
  userName: string;
  userType: string;
  instDistrict: string;
  isOpen: boolean = false;
  toggleTitle: string;
  isShowDropdown: boolean =false;
  studentName: any;
  classId: any;
  className: any;
  section: any;
  class_in_roman:any = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","LKG","UKG","PREKG"];
  display: boolean = false;
  groupName: any;
  groupId: any;
  constructor(
    private navigationService: NavigationService, private router: Router,
    private authService : AuthenticationService,private userSessionService : UserSessionService,private navBarService:NavBarService,
    private modalService: NgbModal,
    private examService: ExamService) {
      this.schoolName = this.userSessionService.schoolName();
      this.studentName = this.userSessionService.studentName();
      this.schoolName = this.userSessionService.schoolName();
      this.classId = this.userSessionService.classStudingId();
      this.className = this.class_in_roman[this.classId];
      this.section = this.userSessionService.section();
      this.groupId = this.userSessionService.groupId();
     }

  ngOnInit() {
      this.examService.getGroupJSON().subscribe(data => {
        debugger;
       const groupDetails = data['group'].filter(x => x.value == this.groupId);
        this.groupName = groupDetails[0].label;
      });
    } 

  toggleDropdown()
  {
    this.isShowDropdown = !this.isShowDropdown;
  }
  // toggleSidebar()
  // {
  //   this.navBarService.toggle();
  //   this.isOpen = !this.isOpen;
  //   this.toggleTitle = this.isOpen ? 'Close' : 'Expand';
  // }
  showConfirmation()
  {
    this.display = true;
  }
  onLogout()
  {
    this.authService.logOut();
    this.navigationService.goToLogin();
    localStorage.removeItem("schoolName");
    localStorage.removeItem('schoolTypeId');
    localStorage.clear();
  }
  cancel()
  {
this.display = false;
  }
  openBasicModal(content) {
    debugger;
    this.modalService.open(content, {}).result.then((result) => {
      var action = result;
      if(action == "logout") {
        this.onLogout();
      }
    }).catch((res) => {});
  }
}
