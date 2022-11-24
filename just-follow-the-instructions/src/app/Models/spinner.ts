export class Spinner {
  public static show(): void {
    const spinnerElement: HTMLElement = <HTMLElement>(
      document.getElementById('spinner')
    );
    spinnerElement.classList.add('show');
    spinnerElement.classList.remove('hide');
  }

  public static hide(): void {
    const spinnerElement: HTMLElement = <HTMLElement>(
      document.getElementById('spinner')
    );
    spinnerElement.classList.remove('show');
    spinnerElement.classList.add('hide');
  }
}
