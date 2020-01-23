const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
};

function find() {
  return db('schemes');
  //   return db.select('*').from('schemes');
}

function findById(id) {
  return db('schemes').where('id', id);
}

function findSteps(id) {
  return (
    db('steps')
      //JOIN MUST GO FIRST --> 'steps' table is joined/connected to 'schemes' table
      .join('schemes', 'steps.scheme_id', '=', 'schemes.id') //these linked by 'keys'
      .select('scheme_name', 'step_number', 'instructions') //SELECT is allowing me to chose from each 'steps' & 'schemes' and pick whatver column and display in the order i write it
      .where('scheme_id', id)
      .orderBy('step_number') //order default ascending --> desc shows descending
  );
}

function add(scheme) {
  return db('schemes').insert(scheme);
}

function addStep(step) {
  return db('steps').insert(step);
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
