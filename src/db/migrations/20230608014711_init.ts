exports.up = function(knex) {
    return knex.schema
        .createTable('roles', function(table) {
        table.increments('id').primary();
        table.string('name');
      })
      .createTable('wf_user', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('password');
        table.date('date_of_birth');
        table.integer('role_id').unsigned().references('id').inTable('roles');
      })
      .createTable('farm', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('last_meter_reading');
        table.string('farm_code');
        table.string('location');
        table.string('details');
        table.string('image_url');
      })
      .createTable('farm_user', function(table) {
        table.integer('farm_id').unsigned().references('id').inTable('farm');
        table.integer('user_id').unsigned().references('id').inTable('wf_user');
      })
      .createTable('entitlemet', function(table) {
        table.increments('id').primary();
        table.string('state');
        table.string('area');
        table.string('region');
        table.string('name');
        table.string('license_number');
        table.integer('volume');
        table.integer('farm_id').unsigned().references('id').inTable('farm');
      })
      .createTable('farm_entitlement', function(table) {
        table.integer('farm_id').unsigned().references('id').inTable('farm');
        table.integer('entitlement_id').unsigned().references('id').inTable('entitlemet');

        //table.integer('farm_id').unsigned().references('id').inTable('farm');
        //table.integer('entitlement_id').unsigned().references('id').inTable('entitlemet');
      })
      .createTable('entitlement_allocation', function(table) {
        table.increments('id').primary();
        table.integer('currant_allocation');
        table.boolean('allocated');
      })
      .createTable('crop', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('details');
        table.string('image_url');
      })
      .createTable('farm_crop', function(table) {
		    table.integer('farm_id').unsigned().references('id').inTable('farm');
        table.integer('crop_id').unsigned().references('id').inTable('crop');
      })
      .createTable('crops_usage', function(table) {
        table.increments('id').primary();
        table.string('commodity');
        table.integer('water_usage');
        table.integer('age');
        table.boolean('active');
      })
      .createTable('company', function(table) {
        table.increments('id').primary();
        table.string('name');
      })
      .createTable('farm_budget', function(table) {
        table.increments('id').primary();
        table.integer('farm_id').unsigned().references('id').inTable('farm');
        table.integer('year');
        table.integer('period_started');
        table.integer('period_end');
      })
      .createTable('farm_budget_activity_type', function(table) {
        table.increments('id').primary();
        table.string('name');
      })
      .createTable('farm_budget_activity', function(table) {
        table.increments('id').primary();
        table.integer('farm_budget_id').unsigned().references('id').inTable('farm_budget');
        table.integer('jan');
        table.integer('feb');
        table.integer('mar');
        table.integer('apr');
        table.integer('may');
        table.integer('jun');
        table.integer('jul');
        table.integer('aug');
        table.integer('sep');
        table.integer('oct');
        table.integer('nov');
        table.integer('dec');
        table.integer('farm_budget_activity_type').unsigned().references('id').inTable('farm_budget_activity_type');
      })      .createTable('farm_water_activity', function(table) {
        table.increments('id').primary();
        table.integer('farm_id').unsigned().references('id').inTable('farm');
        table.integer('water_leased');
        table.integer('water_sold');
        table.integer('water_used');
        table.integer('farm_budget_id').unsigned().references('id').inTable('farm_budget');
      })
      
      .createTable('territory', function (table) {
        table.increments('id').primary();
        table.string('name');
      }).createTable('state', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('territory_id').unsigned().references('id').inTable('territory');
      }).createTable('region', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('state_id').unsigned().references('id').inTable('state');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('farm_budget_activity')
      .dropTableIfExists('farm_budget_activity_type')
      .dropTableIfExists('farm_budget')
      .dropTableIfExists('company')
      .dropTableIfExists('crops_usage')
      .dropTableIfExists('farm_crop')
      .dropTableIfExists('farm_water_activity')
      .dropTableIfExists('entitlement_allocation')
      .dropTableIfExists('farm_entitlement')
      .dropTableIfExists('entitlemet')
      .dropTableIfExists('farm_user')
      .dropTableIfExists('farm')
      .dropTableIfExists('roles')
      .dropTableIfExists('territory')
      .dropTableIfExists('region')
      .dropTableIfExists('state')
  };
  