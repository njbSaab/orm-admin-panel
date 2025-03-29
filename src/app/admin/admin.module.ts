import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPageComponent } from './pages/admin-page/edit-page/edit-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { GrettingEditTabComponent } from './components/tabs-components/gretting-edit-tab/gretting-edit-tab.component';
import { MessageEditTabComponent } from './components/tabs-components/message-edit-tab/message-edit-tab.component';
import { KeysMenuTabComponent } from './components/tabs-components/keys-menu-tab/keys-menu-tab.component';
import { FormsModule } from '@angular/forms';
import { EditIcoComponent } from './components/ui/icons/edit-ico/edit-ico.component';
import { CancelIcoComponent } from './components/ui/icons/cancel-ico/cancel-ico.component';
import { DoneIcoComponent } from './components/ui/icons/done-ico/done-ico.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { SendMessagePageComponent } from './pages/send-message-page/send-message-page.component';
import { AddedImagePageComponent } from './pages/added-image-page/added-image-page.component';
import { AddedPageComponent } from './pages/added-page/added-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    EditPageComponent,
    AdminPageComponent,
    GrettingEditTabComponent,
    MessageEditTabComponent,
    KeysMenuTabComponent,
    EditIcoComponent,
    CancelIcoComponent,
    DoneIcoComponent,
    UsersPageComponent,
    SendMessagePageComponent,
    AddedImagePageComponent,
    AddedPageComponent,
    ProfilePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule
  ],
  exports: [
    EditPageComponent,
    GrettingEditTabComponent, 
    KeysMenuTabComponent,
    MessageEditTabComponent
  ],

})
export class AdminModule { }