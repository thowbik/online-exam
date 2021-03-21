import { Routes, RouterModule } from '@angular/router';

// Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  {
    path: 'exam',
    loadChildren: () => import('../../pages/full-layout-page/exam/exam.module').then(m => m.ExamModule)
  }
];
