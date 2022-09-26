var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Abhi@123',
        database: 'blogappmvc'
    }
});

// Below will be the table for the Users
knex.schema.hasTable("users").then(function (exists) {
    if (!exists) {
        return knex.schema.createTable("users", function (table) {
            table.increments("id").primary()
            table.string("name", 100)
            table.string("email", 100).unique()
            table.string("password", 100)
        }).then(() => {
            console.log("Users Table Created Successfully.");
        }).catch((err) => {
            console.log(err, "This Error is coming in creating Users Table.");
        })
    }
})


/////Below will be the table for the Blogs

knex.schema.hasTable("blogs").then(function (exists) {
    if (!exists) {
        return knex.schema.createTable("blogs", function (tableblog) {
            tableblog.increments("id").primary()
            tableblog.integer('user_id', 11).unsigned().references('users.id');
            tableblog.string("title", 100).unique();
            tableblog.text("description")
            tableblog.timestamps(true, true)
        }).then(() => {
            console.log("Blog Table Created Successfully.");
        }).catch((err) => {
            console.log(err, "This Error is coming in creating Blog Table.");
        })
    }
})

//Below is the table for the LIKE & DISLIKE

knex.schema.hasTable('likedislike').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable("likedislike", function (tablelikedislike) {
            tablelikedislike.increments("id").primary()
            tablelikedislike.integer("blog_id", 20).unsigned().references("blogs.id")
            tablelikedislike.integer("user_id", 20).unsigned().references("users.id")
            tablelikedislike.boolean("likedislike", 20)
            tablelikedislike.timestamps(true, true)
        }).then(() => {
            console.log("Like-Dislike Table Created Successfuly.");
        }).catch((err) => {
            console.log(err, "There is some error.");
        })
    }
})



module.exports = knex;