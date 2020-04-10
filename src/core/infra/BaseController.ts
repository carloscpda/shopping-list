import { Request, Response, NextFunction } from 'express';

export abstract class BaseController {
  // or even private
  protected req: Request;
  protected res: Response;
  protected next: NextFunction;

  protected abstract executeImpl(): Promise<void | any>;

  public execute(req: Request, res: Response, next?: NextFunction): void {
    this.req = req;
    this.res = res;
    this.next = next;

    this.executeImpl();
  }

  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: Response, dto?: T) {
    if (!!dto) {
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  public clientError(message?: string) {
    return BaseController.jsonResponse(this.res, 400, message ? message : 'Bad Request');
  }

  public unauthorized(message?: string) {
    return BaseController.jsonResponse(this.res, 401, message ? message : 'Unauthorized');
  }

  public forbidden(message?: string) {
    return BaseController.jsonResponse(this.res, 403, message ? message : 'Forbidden');
  }

  public notFound(message?: string) {
    return BaseController.jsonResponse(this.res, 404, message ? message : 'Not found');
  }

  public conflict(message?: string) {
    return BaseController.jsonResponse(this.res, 409, message ? message : 'Conflict');
  }

  public tooMany(message?: string) {
    return BaseController.jsonResponse(this.res, 429, message ? message : 'Too many requests');
  }

  public todo() {
    return BaseController.jsonResponse(this.res, 400, 'TODO');
  }

  public fail(error: Error | string) {
    console.log(error);
    return this.res.status(500).json({
      message: error.toString(),
    });
  }
}
