
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, Input, ViewChild, OnInit, ElementRef, Inject, HostListener } from '@angular/core';
import { CounterComponent } from 'src/app/shared/counter.component';
import { ExamService } from './exam.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { DOCUMENT, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from 'src/services/navigation.service';
 import { StorageMap } from '@ngx-pwa/local-storage';
 import * as $ from 'jquery';
 import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  @ViewChild('counter', { read: CounterComponent, static: true })
  // @ViewChild("counter", { read: typeof ElementRef, static: true | false }) flatpickrEl: ElementRef;
  // @ViewChild('counter', {read: typeof ElementRef, static: true })
  private counter: CounterComponent;
  multipleQuestions: any;
  //form: FormGroup;
  max: any;
  QusetionCount: number;
  studentId: number;
  schoolId: number;
  educationMedId: number;
  answerWeithage: number;
  sessionId: number;
  duration: string;
  questionId: number;
  choiceId: any;
  isShowQuestions: boolean = false;
  totalAnsweredQuestions: number;
  examCompleted: boolean = false;
  timeUp: boolean = false;
  totalQuestions: number;
  studentName: any;
  classId: any;
  schoolName: any;
  section: any;
  gender: any;
  class_in_roman: any = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "LKG", "UKG", "PREKG"];
  className: any;
  totalQuestionStatus: any[] = [];
  selectedChoice: any;
  pipe = new DatePipe('en-US');
  offLineData: any[] = [];
  dataRetreived: any[] = [];
  testData: any[]=[];
  AnswerArray: any[]=[];
  questionSetId: any;
  durationUsed: any;
  endTime: Date;
  startTime: Date;
  groupName: any;
  display: boolean;
  alreadyTakenTest: boolean = false;
  groupId: string;
  isOffline: boolean = false;
  startLoader: boolean = false;
  subjectList: any[]=[];
  isStartMyTest: boolean = false;
  isnotAllowedToSave: boolean = false;
  questionCount: number = 0;
  choiceCount: number = 0;
  questionCountReceived: number = 0;
  constructor(private fb: FormBuilder,
    private examService: ExamService,
    private userSessionService: UserSessionService,
    private authService: AuthenticationService,
    public toastr: ToastrService,
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private navigationService: NavigationService,
    private storage: StorageMap,
    private modalService: NgbModal) {
    this.schoolId = this.userSessionService.schoolId();
    this.studentId = this.userSessionService.studentId();
    this.educationMedId = this.userSessionService.educationMediumId();
    this.studentName = this.userSessionService.studentName();
    this.schoolName = this.userSessionService.schoolName();
    this.classId = this.userSessionService.classStudingId();
    this.className = this.class_in_roman[this.classId];
    this.section = this.userSessionService.section();
    this.gender = this.userSessionService.gender();
    this.groupId = this.userSessionService.groupId();
    
  }

  ngOnInit() {
    this.getGroup();
    this.resumeTest();
    //this.blockEScF11();
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
    this.selectedChoice = '';
    this.choiceId = '';
    this.multipleQuestions = [];
    this.QusetionCount = 0;
    //this.initializeValidators();
    this.max = 1;
  }

  getGroup() {
    this.examService.getGroupJSON().subscribe(groupdata => {
      debugger;
     const groupDetails = groupdata['group'].filter(x => x.value == this.groupId);
      this.groupName = groupDetails[0].label;
      const stringToSplit = this.groupName;
        this.subjectList = stringToSplit.split('/');
    });
  }
  startSession(max,min) {
    var records = {"records":{"school_id":this.schoolId,"unique_id_no":this.studentId,"medium_id":this.educationMedId,"group_code":this.groupId,"class_id":this.classId}}
    this.examService.startSession(records).subscribe(data => {
      debugger;
      if (data.dataStatus == true) {
        this.questionSetId = data.qset.qset_id;
        this.sessionId = data.qset.session_id;
        if(this.questionSetId) {
          this.storage.set('questionSetId', this.questionSetId).subscribe(() => {});
          this.storage.set('sessionId', this.sessionId).subscribe(() => {});
        }
        
        // this.startLoader = true;
         this.getQuestionsFromJson();
        // this.getQuestions();
        // setTimeout(() => {
        //   var randomSetNo = Math.floor(Math.random() * (max - min)) + min;
        //   if(randomSetNo == 1) {
        //    this.getQuestions();
        //   }
        //   else {
        //    this.getQuestions();
        //   }
        // }, 5000);
      
      }
      else {
        this.alreadyTakenTest = true;
        setTimeout(() => {
          this.onLogout();
        }, 5000);
      }
    });
    }
  onStart() {
    this.onTimer(0);
    // let elem = document.documentElement;
    //     let methodToBeInvoked = elem.requestFullscreen ||
    //       elem['webkitRequestFullScreen'] || elem['mozRequestFullscreen']
    //       ||
    //       elem['msRequestFullscreen'];
    //     if (methodToBeInvoked) methodToBeInvoked.call(elem);
this.startSession(1,3);
  }
  getQuestions() {
    if(window.navigator.onLine) {
    let records = {"records":{"QsetID":this.questionSetId}}
    this.examService.questionList(this.questionSetId).subscribe(data => {
      debugger;
      if (data.result && data.result.length > 0) {
        /*Suffeling the question by subjects */
        const sub1Question = _.shuffle(data.result.filter(x => x.quest[0].subject == this.subjectList[0]));
       const sub2Question = _.shuffle(data.result.filter(x => x.quest[0].subject == this.subjectList[1]));
        const sub3Question = _.shuffle(data.result.filter(x => x.quest[0].subject == this.subjectList[2]));
      const sub4Question = _.shuffle(data.result.filter(x => x.quest[0].subject == this.subjectList[3]));
     if(this.subjectList.length > 4) {
      const sub5Question = _.shuffle(data.result.filter(x => x.quest[0].subject == this.subjectList[4]));
      this.multipleQuestions =  sub1Question.concat(sub2Question, sub3Question,sub4Question,sub5Question);
     }
     else {
      this.multipleQuestions =  sub1Question.concat(sub2Question, sub3Question,sub4Question);
     }
      
         if(this.multipleQuestions.length > 0) {
          this.isShowQuestions = true;
          this.storage.set('questions', this.multipleQuestions).subscribe(() => {});
          var startTime =  this.pipe.transform(new Date(),'yyyy-MM-dd HH:mm:ss');
          this.storage.set('startTime', startTime).subscribe(() => {});
          this.startTime = new Date();
          this.counter.start();
         }
         /*Suffeling the question by subjects */
        this.startLoader = false;
        this.totalQuestions = this.multipleQuestions.length;
        this.getQuestionStatus();
           /*get Offline Data*/
        this.storage.get('answerData').subscribe((data :any[]) => {
          if(data && data.length > 0) {
            this.offLineData = data;
          }
          else {
            for (var i = 0; i < this.multipleQuestions.length; i++) {
              this.offLineData.push({
                "serial_no": i+1,
                "session_id": this.sessionId,
                "seq_no":this.multipleQuestions[i].quest[0].seq_no,
                "q_id": this.multipleQuestions[i].quest[0].q_id,
                "choice_id":"0",
                "duration":""

              })
            }
          }
          this.isShowQuestions = true;
          this.storage.set('answerData', this.offLineData).subscribe(() => {});
        });
        this.isStartMyTest = true;
         /*get Offline Data*/
      }
    });
  }
  else {
    this.isOffline = true;
    this.toastr.error('Please Check the Internet Connection');
  }
}
startMyTest() {
  debugger;
  this.isShowQuestions = true;
  this.storage.set('questions', this.multipleQuestions).subscribe(() => {});
  this.startTime = new Date();
  this.counter.start();
}
  saveOffline(questionId) {
    debugger;
    let serialNo = this.QusetionCount+1;
    var duration = this.pipe.transform(new Date(),'yyyy-MM-dd HH:mm:ss');
    this.storage.get('answerData').subscribe((data :any[]) => {
      if(data && data.length > 0) {
        this.offLineData = data;
      }
      if(this.offLineData && this.offLineData.length > 0) {
      let index = this.offLineData.findIndex(x => x.q_id === questionId);
  if(index != -1) {
    this.offLineData[index].choice_id = this.choiceId;
    this.offLineData[index].duration = duration;
  }
  else {
    this.offLineData.push({
      "serial_no":serialNo,"session_id":this.sessionId,"q_id":questionId,"choice_id":this.choiceId,"duration":duration
    })
  }
  this.storage.set('answerData', this.offLineData).subscribe(() => {});
  this.updateQuestionStatus(this.choiceId);
}
else {
  this.offLineData.push({
    "serial_no":serialNo,"session_id":this.sessionId,"q_id":questionId,"choice_id":this.choiceId,"duration":duration
  })
  this.storage.set('answerData', this.offLineData).subscribe(() => {});
  this.updateQuestionStatus(this.choiceId);
}
    });
  }
  getQuestionsFromJson() {

    this.examService.getQuestionJSON().subscribe(questionsData => {

      debugger;
      const data = questionsData['questions'].filter(x => x.qset_id == this.questionSetId);
      if (data && data.length > 0) {
        /*Suffeling the question by subjects */
        const sub1Question = _.shuffle(data.filter(x => x.quest[0].subject == this.subjectList[0]));
       const sub2Question = _.shuffle(data.filter(x => x.quest[0].subject == this.subjectList[1]));
        const sub3Question = _.shuffle(data.filter(x => x.quest[0].subject == this.subjectList[2]));
      const sub4Question = _.shuffle(data.filter(x => x.quest[0].subject == this.subjectList[3]));
      if(this.subjectList.length > 4) {
        if(this.subjectList.length > 5) {
          const sub5Question = _.shuffle(data.filter(x => x.quest[0].subject == this.subjectList[4]));
          const sub6Question = _.shuffle(data.filter(x => x.quest[0].subject == this.subjectList[5]));
          this.multipleQuestions =  sub1Question.concat(sub2Question, sub3Question,sub4Question,sub5Question,sub6Question);
         }
         else {
          const sub5Question = _.shuffle(data.filter(x => x.quest[0].subject == this.subjectList[4]));
          this.multipleQuestions =  sub1Question.concat(sub2Question, sub3Question,sub4Question,sub5Question);
         }
       }
       else {
        this.multipleQuestions =  sub1Question.concat(sub2Question, sub3Question,sub4Question);
       }
         if(this.multipleQuestions.length > 0) {
          for (var i = 0; i < this.multipleQuestions.length; i++) {
            var q_id = this.multipleQuestions[i].quest[0].q_id;
            var count = q_id.length;
            this.questionCount += count;   
          }
          console.log(this.questionCount);
          this.storage.set('questionCount', this.questionCount).subscribe(() => {});
          this.isShowQuestions = true;
          this.storage.set('questions', this.multipleQuestions).subscribe(() => {});
          var startTime =  this.pipe.transform(new Date(),'yyyy-MM-dd HH:mm:ss');
          this.storage.set('startTime', startTime).subscribe(() => {});
          this.startTime = new Date();
          this.counter.start();
         }
         /*Suffeling the question by subjects */
        // this.startLoader = false;
        this.totalQuestions = this.multipleQuestions.length;
        this.getQuestionStatus();
           /*get Offline Data*/
        this.storage.get('answerData').subscribe((data :any[]) => {
          if(data && data.length > 0) {
            this.offLineData = data;
          }
          else {
            for (var i = 0; i < this.multipleQuestions.length; i++) {
              this.offLineData.push({
                "serial_no": i+1,
                "session_id": this.sessionId,
                "seq_no":this.multipleQuestions[i].quest[0].seq_no,
                "q_id": this.multipleQuestions[i].quest[0].q_id,
                "choice_id":"0",
                "duration":""

              })
            }
          }
          this.storage.set('answerData', this.offLineData).subscribe(() => {});
        });
        this.isStartMyTest = true;
         /*get Offline Data*/
      }
  });
}
  updateQuestionStatus(choice) {
    debugger;
    this.totalQuestionStatus[this.QusetionCount].answer = choice;
    if(choice && choice !="0") {
      this.totalQuestionStatus[this.QusetionCount].status = true;
    }
    else {
      this.totalQuestionStatus[this.QusetionCount].status = false; 
    }
  
    this.totalAnsweredQuestions = this.QusetionCount+1;
    debugger;
    // var questionIndex= this.totalQuestionStatus.findIndex((x:any)=> x.index == this.QusetionCount);
    if (this.QusetionCount < this.multipleQuestions.length - 1) {
      this.QusetionCount += 1;
      this.selectedChoice = this.totalQuestionStatus[this.QusetionCount].answer;
      this.choiceId = '';
    }
  }
  gotoQuestion(optionSelected, index) {
    debugger;
    this.selectedChoice = optionSelected;
    this.QusetionCount = index;
  }
  skip() {
    debugger;
    this.QusetionCount += 1;
    if (this.QusetionCount < this.multipleQuestions.length - 1) {
      if(this.totalQuestionStatus[this.QusetionCount].answer) {
        this.selectedChoice = this.totalQuestionStatus[this.QusetionCount].answer;
      }
      else {
        this.selectedChoice = ''
        this.choiceId = ''
      }
     
    }
  }
  onTimer(timeTaken) {
    this.counter.startAt = 9000-timeTaken;
    this.counter.counterState.subscribe((msg) => {
      if (msg === 'COMPLETE') {
        if(window.navigator.onLine) {
        this.counterState = 'counter has stopped';

        this.completeTest();
        //this.alertService.error("Time Up");
        this.timeUp = true;
        this.examCompleted = true;
        } 
        else {
          this.isOffline = true;
          this.isnotAllowedToSave = true;
          this.toastr.error('Please Check the Internet Connection');
        }
      }
    });
  }

  answerSelected(data) {
    debugger;
      this.choiceId = data.choice_id;
  }
  // }
  onLogout() {
    this.authService.logOut();
    this.navigationService.goToLogin();
    // localStorage.clear();
  }
  getSelectedAnswer() {
    this.storage.get('answerData').subscribe((user :any[]) => {
      this.offLineData = user; 
  });
}
  completeTest() {
    if(window.navigator.onLine) {
    debugger;
    this.AnswerArray =[];
    this.storage.get('answerData').subscribe((user :any[]) => {
      this.offLineData = user; 
      this.offLineData = this.offLineData.sort((a, b) => a.q_id - b.q_id);
      // this.offLineData.sort((a,b) => b - a);
this.offLineData.forEach(element => {
  var choiceCount = element.choice_id.length;
  this.choiceCount += choiceCount;
  var questionCountReceived = element.q_id.length;
  this.questionCountReceived += questionCountReceived;
  this.AnswerArray.push(element.q_id + element.choice_id);
});
  var answerStr = this.AnswerArray.join(","); 
  var answerStrLen = answerStr.length; 
  var correctLength = this.multipleQuestions.length + this.multipleQuestions.length-1 + this.questionCount; 
  if(answerStrLen == correctLength) {
// Do your operations
this.endTime  = new Date();
let difference = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
var durationTaken = difference.toFixed(0);
  var records = { "records": { "SessionID":this.sessionId,"Answr":answerStr,"QustSetID":this.questionSetId,"UserID":this.studentId,"Duratn":durationTaken}};
    // this.examService.completeTest(records).subscribe(data => {
    //   debugger;
    //   if (data.dataStatus == true) {
    //     var statusRecords = {"records":{"SessionID":this.sessionId,"SessnSts":"1"}};
    //     this.examService.updateStatus(statusRecords).subscribe(data => { 
    //       this.examService.completeTest2(records).subscribe(data => {
    //         this.examCompleted = true;
    //         setTimeout(() => {
    //           this.onLogout();
    //         }, 5000);
    //       });
    //   });
    //   }
    // });
  }
  else {
    this.toastr.error('Invalid Question Count Total Should be'+correctLength+'but the total is'+answerStrLen+'and Total Choices is'+this.choiceCount);
    if(this.choiceCount != this.multipleQuestions.length)
    {
      this.toastr.error('Invalid Choice Count Total Should be'+this.multipleQuestions.length+'but the total is'+this.choiceCount+'and total question count string is'+this.questionCount);
    }
    else if(this.questionCount != this.questionCountReceived){
      this.toastr.error('Invalid Question Count Total Should be'+this.questionCount+'but the total is'+this.questionCountReceived);
    }
  }
  });
  }
  else {
    this.isOffline = true;
     this.isnotAllowedToSave = true;
    this.toastr.error('Please Check the Internet Connection');
  }
}
cancel()
{
this.display = false;
}
openBasicModal(content) {
  debugger;
  this.modalService.open(content, {}).result.then((result) => {
    var action = result;
    if(action == "completeTest") {
     this.completeTest();
    }
    else {
      this.cancel();
    }
  }).catch((res) => {});
}
  clear(data) {
    debugger;
    this.choiceId = 0;
    this.selectedChoice = 0;
    this.saveOffline(data.quest[0].q_id);
  }
  blockEScF11() {
    $(document).on("keydown",function(ev){
      document.onkeydown = function (ev) {
        alert("1");
  if (ev.keyCode == 27) ev.preventDefault();
  }
  })
  }
  resumeUpdatedQuestionStatus(choice,index) {
    this.totalQuestionStatus[index].answer = choice;
    if(choice && choice !="0") {
      this.totalQuestionStatus[this.QusetionCount].status = true;
      // var questionIndex= this.totalQuestionStatus.findIndex((x:any)=> x.index == this.QusetionCount);
      if (this.QusetionCount < this.multipleQuestions.length - 1) {
        this.QusetionCount += 1;
        // this.selectedChoice = choice;
      }
    }
    else {
      this.totalQuestionStatus[this.QusetionCount].status = false; 
    }
  
    this.totalAnsweredQuestions = this.QusetionCount+1;
    console.log(this.totalQuestionStatus);
  }
  getQuestionStatus() {
    for (var i = 0; i < this.multipleQuestions.length; i++) {
      this.totalQuestionStatus.push({
        index: i,
        answer: "",
        status: false
      })
    }

  }
  resumeTest() {
    debugger;
    this.storage.get('questions').subscribe((data :any[]) => {
      if(data && data.length > 0) {
        this.QusetionCount = 0;
       this.multipleQuestions = data;
       this.storage.get('sessionId').subscribe((sessionId :any) => {
        this.sessionId = sessionId;
                });
                this.storage.get('questionSetId').subscribe((questionSetId :any) => {
                  this.questionSetId = questionSetId;
                          });
                          this.storage.get('questionCount').subscribe((questionCount :any) => {
                            this.questionCount = questionCount;
                                    });
       this.storage.get('answerData').subscribe((answers :any[]) => {
        if(answers && answers.length > 0) {
          this.offLineData = answers;
          var lastAnsweredIndex =  _.findLastIndex(answers, function(o) { return o.choice_id != '0'; });
        debugger;
        lastAnsweredIndex = lastAnsweredIndex ? lastAnsweredIndex : 0;
       // this.storage.get('startTime').subscribe((startTime :any) => {
        // if(startTime && answers[lastAnsweredIndex-1].duration != '') {
          if(answers[0].duration != '' && answers[lastAnsweredIndex-1].duration != '') {
            this.startTime = answers[0].duration != '' ? new Date(answers[0].duration) : new Date();
          var endedTime = new Date(answers[lastAnsweredIndex-1].duration);
          let difference =  (endedTime.getTime() - this.startTime.getTime()) / 1000;
          var durationTaken = difference.toFixed(0);
          this.onTimer(durationTaken);
          
        }
        else {
          this.startTime = new Date();
          this.onTimer(0);
        }
     // });
          for (var i = 0; i < answers.length; i++) {
            var status = answers[i].choice_id != '0' ? true : false;
            this.totalQuestionStatus.push({
              index: i,
              answer: answers[i].choice_id,
              status: status
            })
              }
              this.QusetionCount = lastAnsweredIndex == this.multipleQuestions-1 ? lastAnsweredIndex : lastAnsweredIndex+1; 
              this.isShowQuestions = true;
              this.counter.start();
        }
       });
      
      }
  });
  }
  counterState = 'counter is ticking';
}

