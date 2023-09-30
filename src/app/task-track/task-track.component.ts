import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { addDays, addWeeks, startOfWeek, format } from 'date-fns';

@Component({
  selector: 'app-task-track',
  templateUrl: './task-track.component.html',
  styleUrls: ['./task-track.component.scss'],
})
export class TaskTrackComponent {
  currentDate: Date = new Date();
  todayDate: Date = new Date();
  weekDates: Date[] = [];
  weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
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
    this.generateWeekDates(this.currentDate);
  }

  formatDateWithOrdinals(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Add the ordinal indicator to the day
    const ordinalIndicator = this.getOrdinalIndicator(day);

    return `${day}${ordinalIndicator} ${month} ${year}`;
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

  getDateConditional(date: Date): number {
    return date.getDate();
  }

  formatDayWithOrdinals(date: Date): string {
    const day = date.getDate();
    const ordinalIndicator = this.getOrdinalIndicator(day);

    return `${day}${ordinalIndicator}`;
  }

  generateWeekDates(currentDate: Date) {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 0); // Start on Sunday

    this.weekDates = [];

    for (let i = 0; i < 7; i++) {
      // Loop for 7 days (Sunday to Saturday)
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      this.weekDates.push(date);
    }
  }

  prevWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.generateWeekDates(this.currentDate);
  }

  nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.generateWeekDates(this.currentDate);
  }

  isCurrentDate(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  getCurrentWeekNumber(currentDate: Date): number {
    const today = currentDate;
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const days = Math.round(
      (today.valueOf() - firstDayOfYear.valueOf()) / 86400000 + 0.5
    );
    return Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);
  }

  convertDateToLocaleString(date: Date): string {
    return date.toLocaleDateString();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
