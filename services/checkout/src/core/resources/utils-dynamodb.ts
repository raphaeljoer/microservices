import { Utils } from "./utils";
import { PlainObject } from '/opt/layers/banking/src/core/types/plain-object.type';

type Props = {
  obj: PlainObject;
  pk: string;
};

export class DynamoDBUpdateExpressionsBuilder {
  private readonly obj: any;
  private UpdateExpressionsMap = [];
  public ExpressionAttributeNames: PlainObject = {};
  public ExpressionAttributeValues: PlainObject = {};

  constructor(props: Props) {
    delete props.obj[props.pk];
    this.obj = Utils.Obj.clean(props.obj);
    this.build();
  }

  get UpdateExpression() {
    return `SET ${this.UpdateExpressionsMap.join(', ')}`;
  }

  private setUpdateExpression(key: string) {
    this.UpdateExpressionsMap.push(`#${key} = :${key}Value`);
  }

  private setExpressionAttributeName(key: string) {
      this.ExpressionAttributeNames[`#${key}`] = key;
  }

  private setExpressionAttributeValue(key: string, value: any) {
    this.ExpressionAttributeValues[`:${key}Value`] = value;
  }

  private build() {
    for (const key of Object.keys(this.obj)) {
      this.setUpdateExpression(key);
      this.setExpressionAttributeName(key);
      this.setExpressionAttributeValue(key, this.obj[key]);
    }
  }
}