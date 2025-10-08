import {WeightUnit} from './weight-unit';
import {SessionSetType} from './session-set-type';

export interface SessionSet {
  session_id: string;
  session_index: number;
  exercise_index: number;
  weight: number;
  weight_unit: WeightUnit;
  reps: number;
  type: SessionSetType;
  did_fail: boolean;
  created_at: string;
}

export interface CreateSessionSetParams {
  session_id: string;
  session_index: number;
  exercise_index: number;
  weight: number;
  weight_unit: WeightUnit;
  reps: number;
  type: SessionSetType;
  did_fail: boolean;
}

export interface UpdateSessionSetParams {
  session_index: number;
  session_id: string;
  exercise_index: number;
  weight?: number;
  weight_unit?: WeightUnit;
  reps?: number;
  type?: SessionSetType;
  did_fail?: boolean;
}

export interface DeleteSessionSetParams {
  session_index: number;
  session_id: string;
  exercise_index: number;
}
