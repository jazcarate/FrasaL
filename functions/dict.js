const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

exports.handler = async () => {
    const dict = await client.query(q.Map(
        q.Paginate(q.Documents(q.Collection('translations'))),
        q.Lambda(x => q.Get(x))
    ));


    return {
        statusCode: 200,
        body: JSON.stringify(dict.data),
    };
};