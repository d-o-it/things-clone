import { Adapter } from 'ember-pouch';
import PouchDB from 'pouchdb';
import config from 'things/config/environment';
import { isEmpty } from '@ember/utils';
import { assert } from '@ember/debug';

function createDb() {
  assert('emberPouch.localDb must be set', !isEmpty(config.emberPouch.localDb));

  let db = new PouchDB(config.emberPouch.localDb);

  if (config.emberPouch.remoteDb) {
    let remoteDb = new PouchDB(config.emberPouch.remoteDb, { skip_setup: true });

    remoteDb.logIn(config.emberPouch.user, config.emberPouch.pass);

    db.sync(remoteDb, {
      live: true,
      retry: true
    });
  }

  return db;
}

export default Adapter.extend({
  init() {
    this._super(...arguments);
    this.set('db', createDb());
  }
});
