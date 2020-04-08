import models from '../models';
import { DomainEvents } from '../../../core/domain/events/DomainEvents';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
  const aggregateId = new UniqueEntityID(model[primaryKeyField]);
  DomainEvents.dispatchEventsForAggregate(aggregateId);
};

(async function createHooksForAggregateRoots() {
  const { User } = models;

  User.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'user_id'));
  User.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'user_id'));
  User.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'user_id'));
  User.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'user_id'));
  User.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'user_id'));
})();
