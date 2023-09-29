import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { addDays, addWeeks, startOfWeek, format } from 'date-fns';

@Component({
  selector: 'app-task-track',
  templateUrl: './task-track.component.html',
  styleUrls: ['./task-track.component.scss'],
})
export class TaskTrackComponent {
  currentWeekNumber: number | null = null;
  previousWeekNumber: number | null = null;
  nextWeekNumber: number | null = null;
  selectedDate: Date;
  weekDates: Date[] = [];
  currentDate: Date = new Date();
  previousYear: number = 0;
  nextYear: number = 0;
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

  constructor(private datePipe: DatePipe) {
    // Get today's date
    const today = new Date();
    const currentDay = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    this.selectedDate = today;
    this.generateWeekDates();
  }

  generateWeekDates() {
    console.log({
      previousWeekNumber: this.previousWeekNumber,
      currentWeekNumber: this.currentWeekNumber,
      nextWeekNumber: this.nextWeekNumber,
      selectedDate: this.selectedDate,
      weekDates: this.weekDates,
    });

    if (this.selectedDate) {
      const selectedDate = new Date(this.selectedDate);
      const formattedCurrentWeekNumber = this.datePipe.transform(
        selectedDate,
        'w'
      );

      if (formattedCurrentWeekNumber !== null) {
        this.currentWeekNumber = parseInt(formattedCurrentWeekNumber, 10);
      } else {
        this.currentWeekNumber = null;
      }

      // const selectedDate = new Date(this.selectedDate);
      // Calculate the week numbers
      // this.currentWeekNumber = this.getWeekNumber(selectedDate);
      // this.currentWeekNumber = this.datePipe.transform(selectedDate, 'w');

      const previousWeekDate = new Date(selectedDate);
      previousWeekDate.setDate(selectedDate.getDate() - 7); // Go back 7 days to get the previous week
      console.log('previousWeekDate: ', previousWeekDate);

      const formattedPreviousWeekDate = this.datePipe.transform(
        previousWeekDate,
        'w'
      );
      if (formattedPreviousWeekDate !== null) {
        this.previousWeekNumber = parseInt(formattedPreviousWeekDate, 10);
      } else {
        this.previousWeekNumber = null;
      }
      // this.previousWeekNumber = this.getWeekNumber(previousWeekDate);
      this.previousYear = previousWeekDate.getFullYear();

      const nextWeekDate = new Date(selectedDate);
      nextWeekDate.setDate(selectedDate.getDate() + 7); // Go forward 7 days to get the next week
      console.log('nextWeekDate: ', nextWeekDate);
      const formattedNextWeekNumber = this.datePipe.transform(
        nextWeekDate,
        'w'
      );
      if (formattedNextWeekNumber !== null) {
        this.nextWeekNumber = parseInt(formattedNextWeekNumber, 10);
      } else {
        this.nextWeekNumber = null;
      }
      // this.nextWeekNumber = this.getWeekNumber(nextWeekDate);

      this.nextYear = nextWeekDate.getFullYear();

      console.log(this.previousYear, ',', this.nextYear);

      // if (this.previousWeekNumber > this.nextWeekNumber) {
      //   this.nextYear += 1;
      // } else {
      //   this.previousYear -= 1;
      // }
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
  }

  getWeekDates(weekNumber: number, year: number): string[] {
    const startDate = startOfWeek(new Date(year, 0, 1));
    const targetDate = addDays(startDate, (weekNumber - 1) * 7); // Subtract 1 as weeks are 0-based
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      weekDates.push(format(addDays(targetDate, i), 'yyyy-MM-dd'));
    }

    return weekDates;
  }

  // getWeekNumber(date: Date): number {
  //   // Copy date so don't modify original
  //   date = new Date(
  //     Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  //   );
  //   date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

  //   // Get the year of the week's Thursday
  //   console.log('UTC: ', Date.UTC(date.getUTCFullYear(), 0, 4));
  //   const year = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));

  //   // Calculate the week number
  //   return Math.ceil(((date.getTime() - year.getTime()) / 86400000 + 1) / 7);
  // }

  // getWeekNumber(date: Date): number {
  //   // Use the DatePipe to format the date and extract the week number.
  //   const formattedDate = this.datePipe.transform(date, 'w') || 1;
  //   return Number(formattedDate); // Convert the result to a number.
  // }

  // getWeekNumber(date: Date): number {
  //   // Copy the date object so we don't modify the original date
  //   const copiedDate = new Date(date);

  //   // Set the date to January 4th of the target year
  //   copiedDate.setMonth(0, 4);

  //   // Calculate the time elapsed since January 4th
  //   const timeDiff = date.getTime() - copiedDate.getTime();

  //   // Calculate the week number based on the time difference
  //   const weekNumber = Math.ceil((timeDiff / (24 * 60 * 60 * 1000) + 1) / 7);

  //   return weekNumber;
  // }

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
    let dateSelected = null;

    if (selectedWeek == 'previousWeek' && this.previousWeekNumber !== null) {
      // if (this.previousYear > this.nextYear) {
      dateSelected = this.getDateOfWeek(
        this.previousWeekNumber,
        this.previousYear
      );
      console.log(this.previousWeekNumber, this.previousYear);
      // } else {
      //   dateSelected = this.getDateOfWeek(
      //     this.previousWeekNumber,
      //     this.selectedDate.getFullYear()
      //   );
      // }
    } else if (selectedWeek == 'nextWeek' && this.nextWeekNumber !== null) {
      // if (this.previousYear < this.nextYear) {
      dateSelected = this.getDateOfWeek(this.nextWeekNumber, this.nextYear);
      console.log(this.nextWeekNumber, this.nextYear);
      // } else {
      //   dateSelected = this.getDateOfWeek(
      //     this.nextWeekNumber,
      //     this.selectedDate.getFullYear()
      //   );
      // }
    }
    console.log(dateSelected);

    if (dateSelected !== null) {
      this.selectedDate = new Date(dateSelected);
      // console.log(this.selectedDate);
      this.weekDates = [];
      this.previousYear = 0;
      this.nextYear = 0;
      this.generateWeekDates();
    }
  }

  getDateOfWeek(week: number, year: number): Date {
    console.log('getDateOfWeek:', week, year);
    const januaryFirst = new Date(year, 0, 1);
    const daysToAdd = (week - 1) * 7 + (1 - januaryFirst.getDay()); // 1 is for Monday
    return new Date(year, 0, 1 + daysToAdd);
  }

  getMondayDate(weekNumber: number, year: number): string {
    const startDate = startOfWeek(new Date(year, 0, 1));
    const targetDate = addWeeks(startDate, weekNumber - 1); // Subtract 1 as weeks are 0-based
    return format(targetDate, 'yyyy-MM-dd');
  }

  getDateConditional(date: Date): number {
    return date.getDate();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
