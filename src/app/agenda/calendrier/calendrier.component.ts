import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import * as range from 'lodash.range';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  public currentDate: moment.Moment;
  public namesOfDays: string[];
  public weeks: Array<CalendarDate[]> = [];

  constructor() { }

  ngOnInit(): void {
    moment.locale('fr');
    this.currentDate = moment();
    this.namesOfDays = moment.weekdays(true);
    this.generateCalendar(this.currentDate);
  }

  public prevMonth() {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar(this.currentDate);
  }

  public today() {
    this.currentDate = moment();
    this.generateCalendar(this.currentDate);
  }

  public nextMonth() {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar(this.currentDate);
  }

  private fillDates(currentMoment: moment.Moment) {
    const firstDayOfMonth = moment(currentMoment).startOf('month');
    const firstDayOfCalendar = moment(firstDayOfMonth).startOf('week');

    const lastDayOfMonth = moment(currentMoment).endOf('month');
    const lastDayOfCalendar = moment(lastDayOfMonth).endOf('week');

    const startCalendar = firstDayOfCalendar.date();
    return range(startCalendar, startCalendar + lastDayOfCalendar.diff(firstDayOfCalendar, 'days') + 1).map((date) => {
      const newDate = moment(firstDayOfCalendar).date(date);
      return {
        mDate: newDate
      };
    });
  }

  private generateCalendar(currentMoment: moment.Moment) {
    const dates = this.fillDates(currentMoment);

    const weeks = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  public isWeekEnd(date: moment.Moment) {
    if (date.day() === 0 || date.day() === 6) {
      return true;
    } else {
      return false;
    }
  }

  public isActivatedMonth(date: moment.Moment) {
    if (date.month() === this.currentDate.month()) {
      return true;
    } else {
      return false;
    }
  }

  public isToday(date: moment.Moment) {
    const actualDate = moment();
    if (date.date() === actualDate.date() && date.month() === actualDate.month()) {
      return true;
    } else {
      return false;
    }
  }
}
