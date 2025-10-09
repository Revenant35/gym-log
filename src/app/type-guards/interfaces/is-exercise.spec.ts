import { isExercise } from './is-exercise';

describe('isExercise', () => {
  it('should return true for valid Exercise objects', () => {
    const validExercise = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      name: 'Bench Press'
    };
    expect(isExercise(validExercise)).toBeTrue();
  });

  it('should return false when id is missing', () => {
    const invalidExercise = {
      name: 'Bench Press'
    };
    expect(isExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when name is missing', () => {
    const invalidExercise = {
      id: '123e4567-e89b-12d3-a456-426614174000'
    };
    expect(isExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when id is not a valid UUID', () => {
    const invalidExercise = {
      id: 'not-a-uuid',
      name: 'Bench Press'
    };
    expect(isExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when id is not a string', () => {
    const invalidExercise = {
      id: 123,
      name: 'Bench Press'
    };
    expect(isExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when name is not a string', () => {
    const invalidExercise = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 123
    };
    expect(isExercise(invalidExercise)).toBeFalse();
  });

  it('should return false when there are extra keys', () => {
    const invalidExercise = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Bench Press',
      extraKey: 'should not be here'
    };
    expect(isExercise(invalidExercise)).toBeFalse();
  });

  it('should return false for non-object values', () => {
    expect(isExercise(null)).toBeFalse();
    expect(isExercise('not an object')).toBeFalse();
    expect(isExercise(123)).toBeFalse();
    expect(isExercise([])).toBeFalse();
  });
});
