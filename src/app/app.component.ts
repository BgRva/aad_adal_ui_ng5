import { Component } from '@angular/core';

import { LoggerService } from './_core/services/logger.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private logger: LoggerService) { }

  testX(type: string) {
    // Header (2nd param) is optional
    switch (type) {
      case 'success':
        this.logger.notifySuccess('this is a success', 'Success');
        break;
      case 'warn':
        this.logger.notifyWarn('this is a warning', 'Warn');
        break;
      case 'error':
        this.logger.notifyError('this is an epic fail', 'Fail ...');
        break;
      case 'wait':
        this.logger.notifyWait('this is a wait ....', 'Waiting ...');
        break;
      default:
        this.logger.notifyInfo('this is a info', 'Info ...');
    }
  }
}
