
# Zenika Resume Analysis

An app to explore our resume database.

## Architecture

See https://github.com/Zenika/Zenika-Resume-Analysis/wiki.
 
To work on this app (as a developer), you'll need:
- Zenika-Resume-Analysis (this repo)
- [Zenika-Resume-Analysis-Backend](https://github.com/Zenika/Zenika-Resume-Analysis-Backend)
- Elasticsearch

To get a full production-like environment, you'll need in addition:
- [Zenika-Resume](https://github.com/Zenika/Zenika-Resume)
- PostgreSQL

## Setup

### Elasticsearch

#### Using Docker

- Checkout the project Zenika-Resume-Analysis-Backend
- Run the following command from the root: `docker-compose up`

This will start and configure an Elasticsearch instance.

#### Without Docker

- Install the version 6.01 (used in production)
- Create the index formation-user
- Apply the mapping
```
curl -u elastic:changeme -H 'Content-Type: application/json' -X PUT \
    -d @/elasticsearch-data/mapping.json http://elasticsearch:9200/formation-user
```
- Create the alias 
```
curl -u elastic:changeme -H 'Content-Type: application/json' -X PUT \
    -d @/elasticsearch-data/_aliases.json http://elasticsearch:9200/formation-user
```
- Check that both the index and the alias were created
``` 
http://localhost:9200/_cat/indices?v
```

### Importing data

#### From another Elasticsearch

You may use the elasticdump executable to export/import the data. See https://www.systutorials.com/docs/linux/man/1-elasticdump/. 

To export the data from another instance using this tool in Docker, use this command:
```
docker run --rm -ti -v /data:/tmp taskrabbit/elasticsearch-dump \
  --input=$ELASTICSEARCH_URL_TO_EXPORT_FROM \
  --output=/tmp/data-backup.json \
  --type=data
```

To import the data from the JSON file created by the export:
```
docker run --net=host --rm -ti -v /data:/tmp taskrabbit/elasticsearch-dump \
    --bulk=true --input=/tmp/data-backup.json --output=http://elastic:changeme@localhost:9200
```

#### From Zenika Resume

Run Zenika Analysis Backend and hit the `/index-users` end-point.

### Zenika Analysis Backend

- Checkout https://github.com/Zenika/Zenika-Resume-Analysis-Backend.
- Configure environnement variables:
  - `google.client.clientId` and `google.client.clientSecret`: configuration for the Google authentication (contact dreamlab@zenika.com to get working values)
  - `elasticsearch.url`: URL to Elasticsearch (`http://localhost:9200` for local development)
  - `zenika.writing.resume.url`: the URL to Zenika Resume, used to generate links
  - `USER_AUTH_API_USERNAME` and `USER_AUTH_API_PASSWORD`: the username and password used for basic HTTP authentication to the Zenika Resume API; this is used to only to import resumes from Zenika Resume to Zenika Resume Analysis; you might not need it for local dev; if you do run a local Zenika Resume instance and set the same value for both Zenika Resume and Zenika Resume Analysis

### Zenika Resume Analysis (front-end)

Checkout https://github.com/Zenika/Zenika-Resume-Analysis.

No environnement variable is necessary, the files inside the directory zenika-resume-analysis/src/environments declare the url of application Zenika Resume Analysis Backend.

Run with `npm run dev`.

 
