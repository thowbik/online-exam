import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
@Injectable()
export class ExamService {

    constructor(private dataService: DataService) {};


    // getStudentList(data,refresh) {
    //     debugger;
    //     ?school_id = 2112
    //     return this.http.get<any>('http://13.232.228.90' + route).map(response => {
    //       return response;
    //     });
    // }
    questionList(questionSetId) {

      return this.dataService.getData('/api/QuestnSet?QsetID='+questionSetId,true);
    }
    completeTest(data) {
      debugger;
      return this.dataService.post('/api/InsrtAnswr',data);
    }
    completeTest2(data) {
      debugger;
      return this.dataService.postExternal(data);
    }
    updateStatus(data) {
      debugger;
      return this.dataService.post('/api/SessionUpdate',data);
    }
    startSession(data) {
      return this.dataService.post('/api/CreateSession',data);
    }
    public getGroupJSON() {
      return this.dataService.getJSON('../../../assets/json/groupv9.json');
    }
    public getQuestionJSON() {
      return this.dataService.getJSON('../../../assets/json/questionsv49.json');
    }

}
