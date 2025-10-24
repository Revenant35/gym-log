import { Directive, input, model, numberAttribute } from '@angular/core';

@Directive({
  selector: 'input [debounceTime]',
  host: {
    '[value]': 'value()',
    '(input)': 'handleInput($event)',
  },
})
export class DebounceDirective {
  #debounceTimer?: ReturnType<typeof setTimeout>;

  readonly debounceTime = input(0, { transform: numberAttribute });
  readonly value = model<string>();

  handleInput(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) {
      // TODO: Log a warning
      return;
    }

    const value = event.target.value;

    clearTimeout(this.#debounceTimer);

    if (!value || !this.debounceTime()) {
      this.value.set(value);
    } else {
      this.#debounceTimer = setTimeout(() => this.value.set(value), this.debounceTime());
    }
  }
}
