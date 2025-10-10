import { isSchedule } from './is-schedule';
import { Schedule } from '../../models';

describe('isSchedule', () => {
  it('should return true for valid Schedule objects', () => {
    const validSchedule: Schedule = {
      days: {
        monday: {
          name: 'Push Day',
          exercises: [
            {
              name: 'Bench Press',
              sets: 3,
              reps: 10,
              weight: 135,
              weight_unit: 'LB'
            }
          ]
        },
        wednesday: {
          name: 'Pull Day',
          exercises: [
            {
              name: 'Deadlift',
              sets: 5,
              reps: 5,
              weight: 225,
              weight_unit: 'LB'
            }
          ]
        },
        friday: {
          name: 'Leg Day',
          exercises: [
            {
              name: 'Squat',
              sets: 4,
              reps: 8,
              weight: 185,
              weight_unit: 'LB'
            }
          ]
        }
      }
    };
    expect(isSchedule(validSchedule)).toBeTrue();
  });

  it('should return true for Schedule with all days defined', () => {
    const validSchedule: Schedule = {
      days: {
        monday: { name: 'Push', exercises: [] },
        tuesday: { name: 'Pull', exercises: [] },
        wednesday: { name: 'Legs', exercises: [] },
        thursday: { name: 'Push', exercises: [] },
        friday: { name: 'Pull', exercises: [] },
        saturday: { name: 'Legs', exercises: [] },
        sunday: { name: 'Rest', exercises: [] }
      }
    };
    expect(isSchedule(validSchedule)).toBeTrue();
  });

  it('should return true for Schedule with empty days object', () => {
    const validSchedule: Schedule = {
      days: {}
    };
    expect(isSchedule(validSchedule)).toBeTrue();
  });

  it('should return true for Schedule with only one day defined', () => {
    const validSchedule: Schedule = {
      days: {
        monday: {
          name: 'Full Body',
          exercises: [
            {
              name: 'Squat',
              sets: 3,
              reps: 10,
              weight: 135,
              weight_unit: 'LB'
            }
          ]
        }
      }
    };
    expect(isSchedule(validSchedule)).toBeTrue();
  });

  it('should return false when days property is missing', () => {
    const invalidSchedule = {};
    expect(isSchedule(invalidSchedule)).toBeFalse();
  });

  it('should return false when days is not an object', () => {
    const invalidSchedule = {
      days: 'not an object'
    };
    expect(isSchedule(invalidSchedule)).toBeFalse();
  });

  it('should return false when days contains invalid day key', () => {
    const invalidSchedule = {
      days: {
        monday: { name: 'Push', exercises: [] },
        invalidDay: { name: 'Invalid', exercises: [] }
      }
    };
    expect(isSchedule(invalidSchedule)).toBeFalse();
  });

  it('should return false when days contains invalid ScheduleDay', () => {
    const invalidSchedule = {
      days: {
        monday: {
          name: 'Push',
          exercises: [
            {
              name: 'Bench Press',
              sets: -3, // Invalid: negative sets
              reps: 10,
              weight: 135,
              weight_unit: 'LB'
            }
          ]
        }
      }
    };
    expect(isSchedule(invalidSchedule)).toBeFalse();
  });

  it('should return false when a day value is not a ScheduleDay or undefined', () => {
    const invalidSchedule = {
      days: {
        monday: { name: 'Push', exercises: [] },
        tuesday: 'not a schedule day'
      }
    };
    expect(isSchedule(invalidSchedule)).toBeFalse();
  });

  it('should return false when there are extra keys at the top level', () => {
    const invalidSchedule = {
      days: {},
      extraKey: 'should not be here'
    };
    expect(isSchedule(invalidSchedule)).toBeFalse();
  });

  it('should return false for non-object values', () => {
    expect(isSchedule(null)).toBeFalse();
    expect(isSchedule('not an object')).toBeFalse();
    expect(isSchedule(123)).toBeFalse();
    expect(isSchedule([])).toBeFalse();
  });
});
