import { ErrorType } from '/opt/layers/banking/src/core/types/error.type';


export class Notification {
  public errors: ErrorType[] = [];

  public hasError(context?: string): boolean {
    if (!context) return this.errors.length > 0;
    return this.errors.some((error) => error.context === context);
  }

  public getErrors(context: string): string {
    const result = this.errors.filter((error) => error.context === context);
    if (result.length === 0) return '';
    return `${result[0].message}`;
  }

  public getErrorMessage(context: string): string {
    const result = this.errors.filter((error) => error.context === context);
    
    if (result.length === 0) return '';
    if (result.length === 1) return `${result[0].message}`;

    const errorMessages = result.reduce((acc, msg, idx, arr) => {
      if (idx === 0) return msg.message;
      if (idx === arr.length - 1) return `${acc} and ${msg.message}.`;
      return `${acc}, ${msg.message}`;
    }, '');

    return `${errorMessages}`;
  }

  public addErrors(errors: ErrorType[]) {
    this.errors = [...this.errors, ...errors];
  }

  public addError(error: ErrorType) {
    this.errors.push(error);
  }

  public clear(context?: string) {
    if (!context) {
      this.errors = [];
      return;
    }

    this.errors = this.errors.filter((error) => error.context !== context);
  }
}

// reference:
// https://martinfowler.com/articles/replaceThrowWithNotification.html
