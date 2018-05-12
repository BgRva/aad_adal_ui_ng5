import { Component, OnInit } from '@angular/core';
import { DataService } from '../_core/services/data.service';
import { LoggerService } from '../_core/services/logger.service';
import { EventItem } from '../_models/event-item';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: EventItem[];
  newCaption: string;
  tmpCaption: string;
  editingInProgress: boolean;
  tmpEvent: EventItem;

  constructor(private dataSrvc: DataService, private logger: LoggerService) { }

  ngOnInit() {
    this.populate();
    this.logger.notifyInfo('Event view activated');
  }

  populate(): void {
    this.dataSrvc.getEvents().subscribe(
      events => {
        this.events = events;
      },
      (errorMsg: string) => {
        this.logger.notifyError('getEvents() error: could not retrieve event items', 'Fail');
      }
    );
  }

  add(): void {
    const event = new EventItem();
    event.description = this.newCaption;
    event.team = 'Goons';
    event.faction = 'Horde';
    event.owner = 'Barney Rubble';

    this.dataSrvc.createEvent(event).subscribe(
      result => {
        this.events.push(result);
        this.newCaption = null;
        this.logger.notifySuccess(`Event created with id=${result.id}`, 'Success');
      },
      (errorMsg: string) => {
        this.logger.notifyError('createEvent() error: could not create a new Event item.', 'Fail');
      }
    );
  }

  update(index: number): void {
    const target = Object.assign({}, this.events[index]);
    target.description = this.tmpCaption;
    target.edit = undefined;
    this.dataSrvc.updateEvent(target).subscribe(
      event => {
        this.events[index] = event;
        this.logger.notifySuccess(`Event ${event.id} updated`, 'Success');
      },
      (errorMsg: string) => {
        this.logger.notifyError('update() error: could not update event item.', 'Fail');
      }
    );
  }

  remove(index: number): void {
    const event = this.events[index];
    this.dataSrvc.deleteEvent(event.id).subscribe(
      result => {
        this.events.splice(index, 1);
        this.logger.notifySuccess(`Event ${result.id} deleted`, 'Success');
      },
      (errorMsg: string) => {
        this.logger.notifyError('remove() error: could not delete event item.', 'Fail');
      }
    );
  }

  editSwitch(event: EventItem): void {
    console.log('editing ' + event);
    if (event.edit === null) {
      event.edit = false;
    }
    event.edit = !event.edit;
    if (event.edit) {
      this.tmpCaption = event.description;
      this.editingInProgress = true;
    } else {
      this.editingInProgress = false;
    }
  }
}
