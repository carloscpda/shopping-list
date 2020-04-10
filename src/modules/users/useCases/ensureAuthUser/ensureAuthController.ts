import { BaseController } from '../../../../core/infra/BaseController';

export class EnsureAuthController extends BaseController {
  async executeImpl(): Promise<any> {
    const isAuthenticated = this.req.isAuthenticated();
    if (!isAuthenticated) {
      return this.unauthorized();
    }

    return this.next();
  }
}
