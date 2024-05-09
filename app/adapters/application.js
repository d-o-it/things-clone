import { Adapter } from 'ember-pouch';
import PouchDB from 'pouchdb';
import config from 'things/config/environment';
import { isEmpty } from '@ember/utils';
import { assert } from '@ember/debug';

function createDb() {
  assert('emberPouch.localDb must be set', !isEmpty(config.emberPouch.localDb));

  const db = new PouchDB(config.emberPouch.localDb);

  if (config.emberPouch.remoteDb) {
    const remoteDb = new PouchDB(config.emberPouch.remoteDb, {
      auth: {
        username: config.emberPouch.user,
        password: config.emberPouch.pass
      }
    });

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
