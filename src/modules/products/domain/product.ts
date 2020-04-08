import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Result } from '../../../core/logic/Result';
import { Guard } from '../../../core/logic/Guard';
import { ProductId } from './productId';
import { SpaceId } from '../../spaces/domain/spaceId';

interface ProductProps {
  name: string;
  spaceId: SpaceId;
}

export class Product extends AggregateRoot<ProductProps> {
  get productId(): ProductId {
    return ProductId.create(this._id).getValue();
  }

  get name(): string {
    return this.props.name;
  }

  get spaceId(): SpaceId {
    return this.props.spaceId;
  }

  private constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ProductProps, id?: UniqueEntityID): Result<Product> {
    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.spaceId, argumentName: 'spaceId' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Product>(guardResult.message);
    } else {
      const product = new Product(props, id);

      return Result.ok<Product>(product);
    }
  }
}
