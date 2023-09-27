import { Component } from '@angular/core';

@Component({
  selector: 'app-task-track',
  templateUrl: './task-track.component.html',
  styleUrls: ['./task-track.component.scss'],
})
export class TaskTrackComponent {
  currentWeekNumber: number = 0;
  previousWeekNumber: number = 0;
  nextWeekNumber: number = 0;
  selectedDate: Date;
  weekDates: Date[] = [];
  currentDate: Date = new Date();
  workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
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
    this.selectedDate = today;
    this.generateWeekDates();
  }

  generateWeekDates() {
    const selectedDate = new Date(this.selectedDate);
    // Calculate the week numbers
    this.currentWeekNumber = this.getWeekNumber(selectedDate);

    const previousWeekDate = new Date(selectedDate);
    previousWeekDate.setDate(selectedDate.getDate() - 7); // Go back 7 days to get the previous week
    this.previousWeekNumber = this.getWeekNumber(previousWeekDate);
    const nextWeekDate = new Date(selectedDate);
    nextWeekDate.setDate(selectedDate.getDate() + 7); // Go forward 7 days to get the next week
    this.nextWeekNumber = this.getWeekNumber(nextWeekDate);

    // Calculate the date of the Monday of the current week
    const monday = new Date(selectedDate);
    monday.setDate(
      selectedDate.getDate() -
        selectedDate.getDay() +
        (selectedDate.getDay() === 0 ? -6 : 1)
    );

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

  convertDateToLocaleString(date: Date): string {
    return date.toLocaleDateString();
  }

  setSelectedDate(selectedWeek: string) {
    let dateSelected: Date = new Date('01/01/2000');

    if (selectedWeek == 'previousWeek') {
      dateSelected = this.getDateOfWeek(
        this.previousWeekNumber,
        this.selectedDate.getFullYear()
      );
    } else if (selectedWeek == 'nextWeek') {
      dateSelected = this.getDateOfWeek(
        this.nextWeekNumber,
        this.selectedDate.getFullYear()
      );
    }
    this.selectedDate = new Date(dateSelected);

    this.weekDates = [];
    this.generateWeekDates();
  }

  getDateOfWeek(week: number, year: number): Date {
    const januaryFirst = new Date(year, 0, 1);
    const daysToAdd = (week - 1) * 7 + (1 - januaryFirst.getDay()); // 1 is for Monday
    return new Date(year, 0, 1 + daysToAdd);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
