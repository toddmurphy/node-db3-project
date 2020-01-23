const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db('schemes').select();
  //   return db.select('*').from('schemes');
}

function findById(id) {
  return db('schemes').where('id', id);
}

function findSteps(id) {}

function add(scheme) {
  return db('schemes').insert(scheme);
}

function update(changes, id) {
  return db('schemes')
    .where('id', id)
    .update(changes)
    .then(() => {
      return findById(id)
        .where('id', id)
        .first();
    });
}

function remove(id) {
  return db('schemes')
    .where('id', id)
    .del();
}
