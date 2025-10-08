import {inject, Injectable} from '@angular/core';
import {defer, map, Observable} from 'rxjs';
import {SUPABASE} from '../injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly supabase = inject(SUPABASE);

  searchExercises(params: ExerciseSearchParams): Observable<Exercise[]> {
    const from = (params.page - 1) * params.limit;
    const to = from + params.limit - 1;

    let query = this.supabase.from('exercise').select(`
      id,
      name,
      created_at
    `);

    const search = params.query?.trim();
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    query = query.range(from, to);

    return defer(() => query)
      .pipe(
        map(({data, error}) => {
          if (error) {
            throw error;
          }
          return data;
        })
      );
  }

  createExercise(params: CreateExerciseParams): Observable<Exercise> {
    const exercise = {name: params.name};

    const query = this.supabase.from('exercise').insert(exercise).select().single();

    return defer(() => query)
      .pipe(
        map(({data, error}) => {
          if (error) {
            throw error;
          }
          return data;
        })
      );
  }

  updateExercise(params: UpdateExerciseParams): Observable<Exercise> {
    const exercise = {id: params.id, name: params.name};
    const query = this.supabase.from('exercise').update(exercise).eq('id', params.id).select().single();

    return defer(() => query)
      .pipe(
        map(({data, error}) => {
          if (error) {
            throw error;
          }
          return data;
        })
      );
  }

  deleteExercise(params: DeleteExerciseParams): Observable<void> {
    const query = this.supabase.from('exercise').delete().eq('id', params.id);

    return defer(() => query)
      .pipe(
        map(({error}) => {
          if (error) {
            throw error;
          }
        })
      );
  }
}
