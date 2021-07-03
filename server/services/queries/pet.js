module.exports.buildQuery = function buildQuery(filter) {
  let query = {}
  if (filter.rescuer) {
    query.rescuer = filter.rescuer
  }
  return query
}