module.exports.buildQuery = function buildQuery(filter) {
  let query = {}
  if (filter.email) {
    query.email = filter.email
  }
  return query
}