'use strict';
import runner from '../runner';

export default {
  up: (queryInterface, Sequelize) => {
    const CREATE_USER = () =>
      queryInterface.createTable('user', {
        user_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        user_first_name: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        user_last_name: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        user_email: {
          type: Sequelize.STRING(250),
          allowNull: false,
          unique: true,
        },
        user_password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        is_email_verified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
      });

    const CREATE_SPACE = () =>
      queryInterface.createTable('space', {
        space_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        owner_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        space_name: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
      });

    const CREATE_SPACE_USER = () =>
      queryInterface.createTable('space_user', {
        space_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
      });

    return runner.run([() => CREATE_USER(), () => CREATE_SPACE(), () => CREATE_SPACE_USER()]);
  },

  down: (queryInterface, Sequelize) => {
    return runner.run([
      () => queryInterface.dropTable('user'),
      () => queryInterface.dropTable('space'),
      () => queryInterface.dropTable('space_user'),
    ]);
  },
};
