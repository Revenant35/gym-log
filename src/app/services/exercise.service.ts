import {inject, Injectable} from '@angular/core';
import {defer, delay, map, Observable, of} from 'rxjs';
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
    const exercise = {id: this.createExerciseId(), name: params.name};
    // TODO: Write to Supabase
    return of(exercise);
  }

  updateExercise(params: UpdateExerciseParams): Observable<Exercise> {
    const exercise = {id: params.id, name: params.name ?? 'TODO'};
    // TODO: Update in Supabase
    return of(exercise);
  }

  deleteExercise(params: DeleteExerciseParams): Observable<void> {
    // TODO: Delete from Supabase
    return of(undefined);
  }

  private createExerciseId(): string {
    return crypto.randomUUID();
  }
}
