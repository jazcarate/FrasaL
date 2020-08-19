const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

async function getDictionary() {
    const ret = await client.query(q.Map(
        q.Paginate(q.Documents(q.Collection('translations'))),
        q.Lambda(x => q.Get(x))
    ));
    return ret.data.map(({ data }) => data);
}

module.exports = { getDictionary }