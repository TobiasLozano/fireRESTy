# TODO features

TODO features
<ins>Frontend<ins>
- <i>Create vite app</i>
- Frontend skeleton
    - Material UI (as firebase)
- Create project (RestyDB)
- upload JSON (storing confidential data)
    - Local storage vs Cookies
- Get collection names
    - generate schema from collection
- Table data 
- Editable fields
- Delete rows  

- export scheme to SQL, Mongodb schema
    - Required fields
    - bson types [[MongoDB docs](https://www.mongodb.com/docs/manual/reference/bson-types/)]
    - schema depth



<ins>Backend<ins>
- create express API
- save encrypted firebase data
- Save databases schemas, collection endpoints (mongoDB), run migration button
- generate endpoints (as postgREST)
[[PostgREST docs](https://docs.postgrest.org/en/v13/references/api/tables_views.html)]

User's workflow
- Enter to app (loader page)
- Create RESTYdb
    - load JSON firebase (encrypt content)
    - save in mongodb
- Query database
    - Show collections (nested select) in tables (edit and delete rows)
- Exporting tools
    - Generate Mongodb schema (Type, required fields)
    - Generate SQL table command

