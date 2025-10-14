# Humm.us

To publish, first `npm run build`, then `npm run deploy`.

## TODO

### Pre-fetch posts from the database and save to a JSON posts file

This prevents needing to set up a posts API. It also prevents saving anything from the site (no comments on posts, for example). The less connections deployed to the web, the better.

This script is MariaDB (possibly MySQL?) specific. Of course, swap DB_* with actual values for the database. The JSON should be written somewhere within the React site source tree so it deploys with the rest of the site. React code to list posts is pending. Baby steps...

```
ssh DB_SERVER_USERNAME@DB_SERVER_IP '
    mysql -u DB_USER -p"DB_PASSWORD" -D simpleblog -N -e "
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
        )
        from posts
    "
'
```