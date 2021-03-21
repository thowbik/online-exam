import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExamComponent } from './exam.component';
import { ExamRoutingModule } from './exam-routing.module';
import { CounterComponent } from 'src/app/shared/counter.component';
import { ExamService } from './exam.service';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
    imports: [
        ExamRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule    
    ],
    exports: [],
    declarations: [
        ExamComponent,
        CounterComponent
    ],
    providers: [ExamService],
})
export class ExamModule { }
