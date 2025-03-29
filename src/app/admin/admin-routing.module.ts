import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EditPageComponent } from './pages/admin-page/edit-page/edit-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { AddedImagePageComponent } from './pages/added-image-page/added-image-page.component';
import { AddedPageComponent } from './pages/added-page/added-page.component';
import { SendMessagePageComponent } from './pages/send-message-page/send-message-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      { path: '', redirectTo: 'edit-page', pathMatch: 'full' },
      { path: 'edit-page', component: EditPageComponent },
      { path: 'users-page', component: UsersPageComponent },
      { path: 'added-image-page', component: AddedImagePageComponent },
      { path: 'added-page', component: AddedPageComponent },
      { path: 'send-message-page', component: SendMessagePageComponent },
      { path: 'profile-page', component: ProfilePageComponent  },
      // Можно добавить и другие дочерние маршруты
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}