# Humm.us

To publish, first `npm run build`, then `npm run deploy`.

### Pre-fetch posts from the database and save to a JSON posts file

This prevents needing to set up a posts API. It also prevents saving anything from the site (no comments on posts, for example). The less connections deployed to the web, the better.

This script is MariaDB (possibly MySQL?) specific. Of course, swap DB_* with actual values for the database. The JSON should be written to public/posts.json in the source tree before building/deploying the site. Note: the "--raw" parameter is vital (without
it, escaped characters like newlines and double quotes would be double-escaped).

```
ssh DB_SERVER_USERNAME@DB_SERVER_IP '
    mysql -u DB_USER -p -D simpleblog -N --raw -e "
        select JSON_ARRAYAGG(
            JSON_OBJECT(
                \"id\", id,
                \"slug\", slug,
                \"title\", title,
                \"summary\", summary,
                \"content_md\", content_md,
                \"published\", published,
                \"created_at\", created_at,
                \"updated_at\", updated_at
            )
	    order by created_at desc
        ) from posts
    "
'
```

## Other

See the [Simple Blog Post API](https://github.com/modalpdx/simpleblogpostapi) for a simple JavaScript API that will run locally and provide CRUD for the blog post database.

## TODO

### Format posts

The #/posts page works, but the content is limited and formatting is lame. Do better.
