import { isSession } from './is-session';
import {Session} from '../../models';

describe('isSession', () => {
  it('should return true for valid Session objects', () => {
    const validSession: Session = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      exercises: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Bench Press',
          sets: [
            {
              weight: 135,
              weight_unit: 'LB',
              reps: 10,
              type: 'WORK',
              did_fail: false,
              created_at: new Date('2025-10-08')
            }
          ],
          created_at: new Date('2025-10-08')
        }
      ],
      user_id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
      created_at: new Date('2025-10-08')
    };
    expect(isSession(validSession)).toBeTrue();
  });

  it('should return true for Session with multiple exercises', () => {
    const session: Session = {
      id: 'a1b2c3d4-e5f6-4789-abcd-ef0123456789',
      exercises: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Bench Press',
          sets: [
            {
              weight: 135,
              weight_unit: 'LB',
              reps: 10,
              type: 'WORK',
              did_fail: false,
              created_at: new Date()
            }
          ],
          created_at: new Date()
        },
        {
          id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
          name: 'Squat',
          sets: [
            {
              weight: 100,
              weight_unit: 'KG',
              reps: 8,
              type: 'WORK',
              did_fail: false,
              created_at: new Date()
            }
          ],
          created_at: new Date()
        }
      ],
      user_id: '123e4567-e89b-42d3-a456-426614174000',
      created_at: new Date()
    };
    expect(isSession(session)).toBeTrue();
  });

  it('should return true for Session with empty exercises array', () => {
    const session: Session = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      exercises: [],
      user_id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
      created_at: new Date()
    };
    expect(isSession(session)).toBeTrue();
  });

  it('should return false when id is missing', () => {
    const invalidSession: Partial<Session> = {
      exercises: [],
      user_id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
      created_at: new Date()
    };
    expect(isSession(invalidSession)).toBeFalse();
  });

  it('should return false when id is not a valid UUID', () => {
    const invalidSession: Session = {
      id: 'not-a-uuid',
      exercises: [],
      user_id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
      created_at: new Date()
    };
    expect(isSession(invalidSession)).toBeFalse();
  });

  it('should return false when exercises is missing', () => {
    const invalidSession: Partial<Session> = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      user_id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
      created_at: new Date()
    };
    expect(isSession(invalidSession)).toBeFalse();
  });

  it('should return false when exercises is not an array', () => {
    const invalidSession = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      exercises: 'not an array',
      user_id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
      created_at: new Date()
    };
    expect(isSession(invalidSession)).toBeFalse();
  });

  it('should return false when exercises contains invalid SessionExercise', () => {
    const invalidSession: Session = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      exercises: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Bench Press',
          sets: [],
          created_at: new Date()
        },
        {
          id: 'not-a-uuid', // Invalid UUID
          name: 'Squat',
          sets: [],
          created_at: new Date()
        }
      ],
      user_id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
      created_at: new Date()
    };
    expect(isSession(invalidSession)).toBeFalse();
  });

  it('should return false when user_id is missing', () => {
    const invalidSession: Partial<Session> = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      exercises: [],
      created_at: new Date()
    };
    expect(isSession(invalidSession)).toBeFalse();
  });

  it('should return false when user_id is not a valid UUID', () => {
    const invalidSession: Session = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      exercises: [],
      user_id: 'not-a-uuid',
      created_at: new Date()
    };
    expect(isSession(invalidSession)).toBeFalse();
  });

  it('should return false when created_at is missing', () => {
    const invalidSession: Partial<Session> = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      exercises: [],
      user_id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8'
    };
    expect(isSession(invalidSession)).toBeFalse();
  });

  it('should return false when created_at is not a valid Date', () => {
    const invalidSession = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      exercises: [],
      user_id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
      created_at: 'not a date'
    };
    expect(isSession(invalidSession)).toBeFalse();
  });

  it('should return false when there are extra keys', () => {
    const invalidSession = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      exercises: [],
      user_id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
      created_at: new Date(),
      extraKey: 'should not be here'
    };
    expect(isSession(invalidSession)).toBeFalse();
  });

  it('should return false for non-object values', () => {
    expect(isSession(null)).toBeFalse();
    expect(isSession('not an object')).toBeFalse();
    expect(isSession(123)).toBeFalse();
    expect(isSession([])).toBeFalse();
  });
});
