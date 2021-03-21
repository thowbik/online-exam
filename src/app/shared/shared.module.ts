import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// COMPONENTS


// DIRECTIVES
import { ComponentsModule } from './component/components.module';
import { ExamService } from '../pages/full-layout-page/exam/exam.service';

@NgModule({
    exports: [
        CommonModule,
        NgbModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        ComponentsModule
    ],
    declarations: [],
    
})
export class SharedModule { }
