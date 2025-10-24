import { Component, computed, inject, resource, signal } from '@angular/core';
import {
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
  Search,
  LoaderCircle,
  Dumbbell,
} from 'lucide-angular';
import { ExerciseService } from '../../../services/exercise.service';
import { DebounceDirective } from '../../../directives/debounce.directive';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-exercises',
  imports: [LucideAngularModule, DebounceDirective],
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent {
  private exerciseService = inject(ExerciseService);

  public readonly query = signal('');
  public readonly page = signal(1);
  public readonly limit = signal(10);

  public readonly exercisesResource = resource({
    params: () => ({
      query: this.query(),
      page: this.page(),
      limit: this.limit(),
    }),
    loader: ({ params }) =>
      lastValueFrom(
        this.exerciseService.findMany({
          query: params.query,
          page: params.page,
          limit: params.limit,
        }),
      ),
    defaultValue: { exercises: [], count: 0 },
  });

  public readonly canGoToNextPage = computed(() => {
    if (!this.exercisesResource.hasValue()) {
      return false;
    }

    const totalExercises = this.exercisesResource.value().count;
    const totalPages = Math.ceil(totalExercises / this.limit());
    return this.page() < totalPages;
  });

  public readonly canGoToPrevPage = computed(() => this.page() > 1);

  nextPage() {
    if (!this.canGoToNextPage()) {
      return;
    }

    this.page.set(this.page() + 1);
  }

  prevPage() {
    if (!this.canGoToPrevPage()) {
      return;
    }

    this.page.set(this.page() - 1);
  }

  protected readonly Search = Search;
  protected readonly LoaderCircle = LoaderCircle;
  protected readonly Dumbbell = Dumbbell;
  protected readonly ChevronRight = ChevronRight;
  protected readonly ChevronLeft = ChevronLeft;
}
