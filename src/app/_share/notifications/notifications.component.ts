import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  // Currently uses https://github.com/akserg/ng2-toasty
  // See https://embed.plnkr.co/plunk/M2rQVb for an example
  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
