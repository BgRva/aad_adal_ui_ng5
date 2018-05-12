import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { ToastyModule } from 'ng2-toasty';


import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
    declarations: [
        NotificationsComponent
    ],
    exports: [
        NotificationsComponent
    ],
    imports: [
        ToastyModule.forRoot(),
    ],
    providers: [
    ]
})
/**
 * This module provides common items used across the application that
 * are not singletons (typically services)
 */
export class ShareModule { }
