import Ajv, { ValidateFunction } from "ajv";
import addFormats from 'ajv-formats';
import { Component } from "../component";
import { EitherProps } from "../types/either-props.type";
import { PlainObject } from "../types/plain-object.type";
import { AppErrorCode } from "/opt/layers/shared/src/enum/app-error-code.enum";
import { HttpStatusCode } from "/opt/layers/shared/src/enum/http-status-code.enum";
import { ValidationError } from "/opt/layers/shared/src/error/validation-error";


export class Validator extends Component {
  readonly #validator = new Ajv({ allErrors: true, coerceTypes: true, removeAdditional: true });

  constructor() {
    super();
    addFormats(this.#validator);
  }

  validate(schema: object, data: PlainObject, context: string = 'VALIDATION_ERROR'): EitherProps<ValidationError, true> {
    let validate: ValidateFunction;

    try {
      validate = this.#validator.compile(schema);
    } catch (error) {
      return this.either.fail(new ValidationError({
        message: error.message,
        context,
        errorCode: AppErrorCode.INVALID_PAYLOAD,
        statusCode: HttpStatusCode.BAD_REQUEST,
        originError: error
      }));
    }

    const result = validate(data);

    if (!result) {
      const errorMessage = validate.errors.map((error) => {
        return `[${error.schemaPath.slice(2)}]: ${error.message}`;
      }).join(', ');

      return this.either.fail(new ValidationError({
        message: errorMessage,
        context,
        errorCode: AppErrorCode.INVALID_PAYLOAD,
        statusCode: HttpStatusCode.BAD_REQUEST,
        originError: validate.errors
      }));
    }

    return this.either.success(result);
  }
}
