import { isSessionSet } from './is-session-set';
import {SessionSet} from '../../models';

describe('isSessionSet', () => {
  it('should return true for valid SessionSet objects', () => {
    const validSessionSet: SessionSet = {
      weight: 135.5,
      weight_unit: 'LB',
      reps: 10,
      type: 'WORK',
      did_fail: false,
      created_at: new Date('2025-10-08')
    };
    expect(isSessionSet(validSessionSet)).toBeTrue();
  });

  it('should return true for warm-up sets', () => {
    const warmUpSet: SessionSet = {
      weight: 45,
      weight_unit: 'KG',
      reps: 5,
      type: 'WARMUP',
      did_fail: false,
      created_at: new Date()
    };
    expect(isSessionSet(warmUpSet)).toBeTrue();
  });

  it('should return true for drop sets', () => {
    const dropSet: SessionSet = {
      weight: 100,
      weight_unit: 'LB',
      reps: 12,
      type: 'DROP',
      did_fail: true,
      created_at: new Date()
    };
    expect(isSessionSet(dropSet)).toBeTrue();
  });

  it('should return false when weight is missing', () => {
    const invalidSet: Partial<SessionSet> = {
      weight_unit: 'LB',
      reps: 10,
      type: 'WORK',
      did_fail: false,
      created_at: new Date()
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false when weight is negative', () => {
    const invalidSet: SessionSet = {
      weight: -10,
      weight_unit: 'LB',
      reps: 10,
      type: 'WORK',
      did_fail: false,
      created_at: new Date()
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false when weight is not finite', () => {
    const invalidSet: SessionSet = {
      weight: Infinity,
      weight_unit: 'LB',
      reps: 10,
      type: 'WORK',
      did_fail: false,
      created_at: new Date()
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false when weight_unit is invalid', () => {
    const invalidSet = {
      weight: 135,
      weight_unit: 'STONE',
      reps: 10,
      type: 'WORK',
      did_fail: false,
      created_at: new Date()
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false when reps is not an integer', () => {
    const invalidSet: SessionSet = {
      weight: 135,
      weight_unit: 'LB',
      reps: 10.5,
      type: 'WORK',
      did_fail: false,
      created_at: new Date()
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false when reps is zero', () => {
    const invalidSet: SessionSet = {
      weight: 135,
      weight_unit: 'LB',
      reps: 0,
      type: 'WORK',
      did_fail: false,
      created_at: new Date()
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false when reps is negative', () => {
    const invalidSet: SessionSet = {
      weight: 135,
      weight_unit: 'LB',
      reps: -5,
      type: 'WORK',
      did_fail: false,
      created_at: new Date()
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false when type is invalid', () => {
    const invalidSet = {
      weight: 135,
      weight_unit: 'LB',
      reps: 10,
      type: 'INVALID_TYPE',
      did_fail: false,
      created_at: new Date()
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false when did_fail is not a boolean', () => {
    const invalidSet = {
      weight: 135,
      weight_unit: 'LB',
      reps: 10,
      type: 'WORK',
      did_fail: 'false',
      created_at: new Date()
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false when created_at is not a valid Date', () => {
    const invalidSet = {
      weight: 135,
      weight_unit: 'LB',
      reps: 10,
      type: 'WORK',
      did_fail: false,
      created_at: 'not a date'
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false when created_at is an invalid Date object', () => {
    const invalidSet: SessionSet = {
      weight: 135,
      weight_unit: 'LB',
      reps: 10,
      type: 'WORK',
      did_fail: false,
      created_at: new Date('invalid')
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false when there are extra keys', () => {
    const invalidSet = {
      weight: 135,
      weight_unit: 'LB',
      reps: 10,
      type: 'WORK',
      did_fail: false,
      created_at: new Date(),
      extraKey: 'should not be here'
    };
    expect(isSessionSet(invalidSet)).toBeFalse();
  });

  it('should return false for non-object values', () => {
    expect(isSessionSet(null)).toBeFalse();
    expect(isSessionSet('not an object')).toBeFalse();
    expect(isSessionSet(123)).toBeFalse();
    expect(isSessionSet([])).toBeFalse();
  });
});
