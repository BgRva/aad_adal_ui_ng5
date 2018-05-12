import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../_core/services/logger.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.notifyInfo('User view activated');
  }

}
