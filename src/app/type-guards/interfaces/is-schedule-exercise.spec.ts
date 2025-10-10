import { isScheduleExercise } from './is-schedule-exercise';
import { ScheduleExercise } from '../../models';

describe('isScheduleExercise', () => {
  it('should return true for valid ScheduleExercise objects', () => {
    const validExercise: ScheduleExercise = {
      name: 'Bench Press',
      sets: 3,
      reps: 10,
      weight: 135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(validExercise)).toBeTrue();
  });

  it('should return true for exercises with KG weight unit', () => {
    const validExercise: ScheduleExercise = {
      name: 'Squat',
      sets: 5,
      reps: 5,
      weight: 100,
      weight_unit: 'KG'
    };
    expect(isScheduleExercise(validExercise)).toBeTrue();
  });

  it('should return false when name is missing', () => {
    const invalidExercise: Partial<ScheduleExercise> = {
      sets: 3,
      reps: 10,
      weight: 135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when name is not a string', () => {
    const invalidExercise = {
      name: 123,
      sets: 3,
      reps: 10,
      weight: 135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when sets is missing', () => {
    const invalidExercise: Partial<ScheduleExercise> = {
      name: 'Bench Press',
      reps: 10,
      weight: 135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when sets is not an integer', () => {
    const invalidExercise: ScheduleExercise = {
      name: 'Bench Press',
      sets: 3.5,
      reps: 10,
      weight: 135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when sets is zero or negative', () => {
    const invalidExercise1: ScheduleExercise = {
      name: 'Bench Press',
      sets: 0,
      reps: 10,
      weight: 135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise1)).toBeFalse();

    const invalidExercise2: ScheduleExercise = {
      name: 'Bench Press',
      sets: -3,
      reps: 10,
      weight: 135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise2)).toBeFalse();
  });

  it('should return false when sets is not finite', () => {
    const invalidExercise: ScheduleExercise = {
      name: 'Bench Press',
      sets: Infinity,
      reps: 10,
      weight: 135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when reps is not an integer', () => {
    const invalidExercise: ScheduleExercise = {
      name: 'Bench Press',
      sets: 3,
      reps: 10.5,
      weight: 135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when reps is zero or negative', () => {
    const invalidExercise1: ScheduleExercise = {
      name: 'Bench Press',
      sets: 3,
      reps: 0,
      weight: 135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise1)).toBeFalse();

    const invalidExercise2: ScheduleExercise = {
      name: 'Bench Press',
      sets: 3,
      reps: -10,
      weight: 135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise2)).toBeFalse();
  });

  it('should return false when weight is not an integer', () => {
    const invalidExercise: ScheduleExercise = {
      name: 'Bench Press',
      sets: 3,
      reps: 10,
      weight: 135.5,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when weight is zero or negative', () => {
    const invalidExercise1: ScheduleExercise = {
      name: 'Bench Press',
      sets: 3,
      reps: 10,
      weight: 0,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise1)).toBeFalse();

    const invalidExercise2: ScheduleExercise = {
      name: 'Bench Press',
      sets: 3,
      reps: 10,
      weight: -135,
      weight_unit: 'LB'
    };
    expect(isScheduleExercise(invalidExercise2)).toBeFalse();
  });

  it('should return false when weight_unit is invalid', () => {
    const invalidExercise = {
      name: 'Bench Press',
      sets: 3,
      reps: 10,
      weight: 135,
      weight_unit: 'STONE'
    };
    expect(isScheduleExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when there are extra keys', () => {
    const invalidExercise = {
      name: 'Bench Press',
      sets: 3,
      reps: 10,
      weight: 135,
      weight_unit: 'LB',
      extraKey: 'should not be here'
    };
    expect(isScheduleExercise(invalidExercise)).toBeFalse();
  });

  it('should return false for non-object values', () => {
    expect(isScheduleExercise(null)).toBeFalse();
    expect(isScheduleExercise('not an object')).toBeFalse();
    expect(isScheduleExercise(123)).toBeFalse();
    expect(isScheduleExercise([])).toBeFalse();
  });
});
