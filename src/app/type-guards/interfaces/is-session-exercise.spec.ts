import { isSessionExercise } from './is-session-exercise';
import { SessionExercise } from '../../models';

describe('isSessionExercise', () => {
  it('should return true for valid SessionExercise objects', () => {
    const validSessionExercise: SessionExercise = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      name: 'Bench Press',
      sets: [
        {
          weight: 135,
          weight_unit: 'LB',
          reps: 10,
          type: 'WORK',
          did_fail: false,
          created_at: new Date('2025-10-08'),
        },
      ],
      created_at: new Date('2025-10-08'),
    };
    expect(isSessionExercise(validSessionExercise)).toBeTrue();
  });

  it('should return true for SessionExercise with multiple sets', () => {
    const sessionExercise: SessionExercise = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Squat',
      sets: [
        {
          weight: 45,
          weight_unit: 'KG',
          reps: 5,
          type: 'WARMUP',
          did_fail: false,
          created_at: new Date(),
        },
        {
          weight: 100,
          weight_unit: 'KG',
          reps: 8,
          type: 'WORK',
          did_fail: false,
          created_at: new Date(),
        },
        {
          weight: 80,
          weight_unit: 'KG',
          reps: 12,
          type: 'DROP',
          did_fail: true,
          created_at: new Date(),
        },
      ],
      created_at: new Date(),
    };
    expect(isSessionExercise(sessionExercise)).toBeTrue();
  });

  it('should return true for SessionExercise with empty sets array', () => {
    const sessionExercise: SessionExercise = {
      id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
      name: 'Deadlift',
      sets: [],
      created_at: new Date(),
    };
    expect(isSessionExercise(sessionExercise)).toBeTrue();
  });

  it('should return false when id is missing', () => {
    const invalidSessionExercise: Partial<SessionExercise> = {
      name: 'Bench Press',
      sets: [],
      created_at: new Date(),
    };
    expect(isSessionExercise(invalidSessionExercise)).toBeFalse();
  });

  it('should return false when id is not a valid UUID', () => {
    const invalidSessionExercise: SessionExercise = {
      id: 'not-a-uuid',
      name: 'Bench Press',
      sets: [],
      created_at: new Date(),
    };
    expect(isSessionExercise(invalidSessionExercise)).toBeFalse();
  });

  it('should return false when name is missing', () => {
    const invalidSessionExercise: Partial<SessionExercise> = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      sets: [],
      created_at: new Date(),
    };
    expect(isSessionExercise(invalidSessionExercise)).toBeFalse();
  });

  it('should return false when name is not a string', () => {
    const invalidSessionExercise = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      name: 123,
      sets: [],
      created_at: new Date(),
    };
    expect(isSessionExercise(invalidSessionExercise)).toBeFalse();
  });

  it('should return false when sets is missing', () => {
    const invalidSessionExercise: Partial<SessionExercise> = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      name: 'Bench Press',
      created_at: new Date(),
    };
    expect(isSessionExercise(invalidSessionExercise)).toBeFalse();
  });

  it('should return false when sets is not an array', () => {
    const invalidSessionExercise = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      name: 'Bench Press',
      sets: 'not an array',
      created_at: new Date(),
    };
    expect(isSessionExercise(invalidSessionExercise)).toBeFalse();
  });

  it('should return false when sets contains invalid SessionSet', () => {
    const invalidSessionExercise: SessionExercise = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      name: 'Bench Press',
      sets: [
        {
          weight: 135,
          weight_unit: 'LB',
          reps: 10,
          type: 'WORK',
          did_fail: false,
          created_at: new Date(),
        },
        {
          weight: -50, // Invalid: negative weight
          weight_unit: 'LB',
          reps: 10,
          type: 'WORK',
          did_fail: false,
          created_at: new Date(),
        },
      ],
      created_at: new Date(),
    };
    expect(isSessionExercise(invalidSessionExercise)).toBeFalse();
  });

  it('should return false when created_at is missing', () => {
    const invalidSessionExercise: Partial<SessionExercise> = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      name: 'Bench Press',
      sets: [],
    };
    expect(isSessionExercise(invalidSessionExercise)).toBeFalse();
  });

  it('should return false when created_at is not a valid Date', () => {
    const invalidSessionExercise = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      name: 'Bench Press',
      sets: [],
      created_at: 'not a date',
    };
    expect(isSessionExercise(invalidSessionExercise)).toBeFalse();
  });

  it('should return false when there are extra keys', () => {
    const invalidSessionExercise = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      name: 'Bench Press',
      sets: [],
      created_at: new Date(),
      extraKey: 'should not be here',
    };
    expect(isSessionExercise(invalidSessionExercise)).toBeFalse();
  });

  it('should return false for non-object values', () => {
    expect(isSessionExercise(null)).toBeFalse();
    expect(isSessionExercise('not an object')).toBeFalse();
    expect(isSessionExercise(123)).toBeFalse();
    expect(isSessionExercise([])).toBeFalse();
  });
});
