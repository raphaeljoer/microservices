import { Component } from '../component';

export abstract class UseCase<Input = any, Output = any> extends Component {
  abstract execute(input?: Input): Promise<Output> | Output
}
