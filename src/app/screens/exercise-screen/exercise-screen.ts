import {Component, computed, inject, signal} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ExerciseService} from '../../services/exercise.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {catchError, debounceTime, distinctUntilChanged, map, of, startWith, switchMap} from 'rxjs';
import {FormsModule} from '@angular/forms';

type Loading = { state: 'loading' };
type ErrorS = { state: 'error'; error: unknown };
type Ready = { state: 'ready'; data: Exercise[] };
export type SearchState = Loading | ErrorS | Ready;

@Component({
  selector: 'app-exercise-screen',
  imports: [
    IonicModule,
    FormsModule
  ],
  templateUrl: './exercise-screen.html',
  styleUrl: './exercise-screen.scss'
})
export class ExerciseScreen {
  private readonly exerciseService = inject(ExerciseService);

  readonly query = signal<string>('');
  readonly page = signal<number>(1);
  readonly pageSize = signal<number>(20);

  private readonly searchParams = computed<ExerciseSearchParams>(() => ({
    query: this.query(),
    page: this.page(),
    limit: this.pageSize(),
  }));

  readonly result = toSignal(
    toObservable(this.searchParams).pipe(
      debounceTime(250),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap(p => {
        return this.exerciseService.searchExercises(p).pipe(
            map<Exercise[], SearchState>(data => ({ state: 'ready', data })),
            catchError(err => of<SearchState>({ state: 'error', error: err })),
          )
        }
      ),
      startWith<SearchState>({ state: 'loading' }),
    ),
    { initialValue: { state: 'loading' } },
  );


  isLoading(s: SearchState | undefined): s is Loading {
    return s?.state === 'loading';
  }

  isError(s: SearchState | undefined): s is ErrorS {
    return s?.state === 'error';
  }

  isReady(s: SearchState | undefined): s is Ready {
    return s?.state === 'ready';
  }
}
