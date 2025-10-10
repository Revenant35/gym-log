import { isScheduleDay } from './is-schedule-day';
import { ScheduleDay } from '../../models';

describe('isScheduleDay', () => {
  it('should return true for valid ScheduleDay objects', () => {
    const validDay: ScheduleDay = {
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
    };
    expect(isScheduleDay(validDay)).toBeTrue();
  });

  it('should return true for ScheduleDay with multiple exercises', () => {
    const validDay: ScheduleDay = {
      name: 'Leg Day',
      exercises: [
        {
          name: 'Squat',
          sets: 5,
          reps: 5,
          weight: 225,
          weight_unit: 'LB'
        },
        {
          name: 'Leg Press',
          sets: 3,
          reps: 12,
          weight: 300,
          weight_unit: 'LB'
        },
        {
          name: 'Leg Curl',
          sets: 3,
          reps: 15,
          weight: 80,
          weight_unit: 'LB'
        }
      ]
    };
    expect(isScheduleDay(validDay)).toBeTrue();
  });

  it('should return true for ScheduleDay with empty exercises array', () => {
    const validDay: ScheduleDay = {
      name: 'Rest Day',
      exercises: []
    };
    expect(isScheduleDay(validDay)).toBeTrue();
  });

  it('should return false when name is missing', () => {
    const invalidDay: Partial<ScheduleDay> = {
      exercises: []
    };
    expect(isScheduleDay(invalidDay)).toBeFalse();
  });

  it('should return false when name is not a string', () => {
    const invalidDay = {
      name: 123,
      exercises: []
    };
    expect(isScheduleDay(invalidDay)).toBeFalse();
  });

  it('should return false when exercises is missing', () => {
    const invalidDay: Partial<ScheduleDay> = {
      name: 'Push Day'
    };
    expect(isScheduleDay(invalidDay)).toBeFalse();
  });

  it('should return false when exercises is not an array', () => {
    const invalidDay = {
      name: 'Push Day',
      exercises: 'not an array'
    };
    expect(isScheduleDay(invalidDay)).toBeFalse();
  });

  it('should return false when exercises contains invalid ScheduleExercise', () => {
    const invalidDay = {
      name: 'Push Day',
      exercises: [
        {
          name: 'Bench Press',
          sets: 3,
          reps: 10,
          weight: 135,
          weight_unit: 'LB'
        },
        {
          name: 'Overhead Press',
          sets: -3, // Invalid: negative sets
          reps: 10,
          weight: 95,
          weight_unit: 'LB'
        }
      ]
    };
    expect(isScheduleDay(invalidDay)).toBeFalse();
  });

  it('should return false when there are extra keys', () => {
    const invalidDay = {
      name: 'Push Day',
      exercises: [],
      extraKey: 'should not be here'
    };
    expect(isScheduleDay(invalidDay)).toBeFalse();
  });

  it('should return false for non-object values', () => {
    expect(isScheduleDay(null)).toBeFalse();
    expect(isScheduleDay('not an object')).toBeFalse();
    expect(isScheduleDay(123)).toBeFalse();
    expect(isScheduleDay([])).toBeFalse();
  });
});
