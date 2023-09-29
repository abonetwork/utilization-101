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
  weekDates: Date[] = [];

  constructor() {
    this.generateWeekDates(this.currentDate);
  }

  generateWeekDates(currentDate: Date) {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

    this.weekDates = [];

    for (let i = 0; i < 5; i++) {
      // Loop for 5 days (Monday to Friday)
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
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
