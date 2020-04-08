import { BaseController } from '../../../../core/infra/BaseController';
import { CreateSpaceUseCase } from './CreateSpaceUseCase';
import { CreateSpaceDTO } from './CreateSpaceDTO';
import { CreateSpaceErrors } from './CreateSpaceErrors';

export class CreateSpaceController extends BaseController {
  private useCase: CreateSpaceUseCase;

  constructor(useCase: CreateSpaceUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(): Promise<any> {
    const dto: CreateSpaceDTO = this.req.body as CreateSpaceDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateSpaceErrors.UserDoesntExistError:
            return this.notFound(error.errorValue().message);
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.ok(this.res);
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
