import { Component } from '@angular/core';

@Component({
  selector: 'app-task-track',
  templateUrl: './task-track.component.html',
  styleUrls: ['./task-track.component.scss'],
})
export class TaskTrackComponent {
  currentWeekNumber: number;
  previousWeekNumber: number;
  nextWeekNumber: number;
  weekDates: Date[] = [];
  currentDate: Date = new Date();
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  priority = ['P1', 'P2', 'P3', 'P4'];
  tasks = [
    { title: 'Client Training', acronym: 'CT' },
    { title: 'Cases', acronym: 'CA' },
    { title: 'Quality', acronym: 'QL' },
    { title: 'Documentation', acronym: 'DC' },
    { title: 'Client Meeting', acronym: 'CM' },
    { title: 'Internal Meeting', acronym: 'IM' },
    { title: 'Break', acronym: 'BR' },
    { title: 'Holiday', acronym: 'HL' },
    { title: 'Time-off', acronym: 'TO' },
    { title: 'Accenture Training', acronym: 'AT' },
    { title: 'Admin', acronym: 'AD' },
    { title: 'Development', acronym: 'DV' },
  ];

  constructor() {
    // Get today's date
    const today = new Date();
    const currentDay = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    // Calculate the week numbers
    this.currentWeekNumber = this.getWeekNumber(today);
    const previousWeekDate = new Date(today);
    previousWeekDate.setDate(today.getDate() - 7); // Go back 7 days to get the previous week
    this.previousWeekNumber = this.getWeekNumber(previousWeekDate);
    const nextWeekDate = new Date(today);
    nextWeekDate.setDate(today.getDate() + 7); // Go forward 7 days to get the next week
    this.nextWeekNumber = this.getWeekNumber(nextWeekDate);

    // Calculate the date of the Monday of the current week
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

    // Create an array of dates from Monday to Friday
    for (let i = 0; i < 5; i++) {
      this.weekDates.push(new Date(monday));
      monday.setDate(monday.getDate() + 1);
    }
  }

  getWeekNumber(date: Date): number {
    // Copy date so don't modify original
    date = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

    // Get the year of the week's Thursday
    const year = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));

    // Calculate the week number
    return Math.ceil(((date.getTime() - year.getTime()) / 86400000 + 1) / 7);
  }

  formatDateWithOrdinals(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Add the ordinal indicator to the day
    const ordinalIndicator = this.getOrdinalIndicator(day);

    return `${day}${ordinalIndicator} ${month} ${year}`;
  }

  formatDayWithOrdinals(date: Date): string {
    const day = date.getDate();
    const ordinalIndicator = this.getOrdinalIndicator(day);

    return `${day}${ordinalIndicator}`;
  }

  getOrdinalIndicator(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
