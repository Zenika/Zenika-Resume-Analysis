
Guideline to install Zenika Resume Analysise analysis


1) Global diagram about applications communication


                            
                                             +-----------------+
                                             |                 |
                                             |  Elasticsearch  |
                                             |                 |
                                             +-------^---------+
                                                     |
                                                     |
                                                     |  search or index users(Basic auth)
                                                     |
                    search or manual import(OAuth2)  |
+------------------------+            +--------------v------------------+
|                        |            |                                 |
| Zenika-resume-analysis <------------> Zenika-Resume-Analysis-Backend  |
|                        |            |                                 |
+------------------------+            +--------------^------------------+
                                                     |
                                                     |
                                                     | cronBatch getAllUser(Basic auth)
                                                     |
                                                     |
                                              +------v--------+
                                              |               |
                                              | Zenika Resume |
                                              |               |
                                              +------^--------+
                                                     |
                                                     |
                                                     |
                                                     |
                                                     |
                                                     |
                                               +-----v------+
                                               | Postgresql |
                                               +------------+

 
* Applications to install at minimum :
Zenika-resume-analysis,
Zenika-Resume-Analysis-Backend 
elasticsearch
This installation is enough in case where the datas (cv zenika) are previously injected in elasticsearch (from a dump for example) without launch indexation process


* Application to install to manage all the integration :
Zenika-resume-analysis,
Zenika-Resume-Analysis-Backend 
Zenika-resume
elasticsearch
postgresql


2) Installations

2.1) Elasticsearch

With Docker :

Checkout the project Zenika-Resume-Analysis-Backend
Execute the following command from the project Zenika-Resume-Analysis-Backend :
docker-compose up

Once executed, the elasticsearch container and all mapping/alias will be created.

Or manually, 

* Install the version 6.01 (used in production)

* Create the index formation-user

curl -u elastic:changeme -H 'Content-Type: application/json' -X PUT \
-d @/elasticsearch-data/mapping.json http://elasticsearch:9200/formation-user

* Create the alias 

curl -u elastic:changeme -H 'Content-Type: application/json' -X PUT \
-d @/elasticsearch-data/_aliases.json http://elasticsearch:9200/formation-user
 
* Check it
 
http://localhost:9200/_cat/indices?v
 
* Import the datas (cv zenika)

You may use the elasticdump executable to export/impots the datas.
https://www.systutorials.com/docs/linux/man/1-elasticdump/

Install elasticdump with Docker :
docker pull taskrabbit/elasticsearch-dump

Export production data to json file

docker run --rm -ti -v /data:/tmp taskrabbit/elasticsearch-dump \
  --input=$URL_ELASTICSEARCH_PROD \
  --output=/tmp/data-backup.json \
  --type=data


import from json file to localhost elasticsearch

docker run --net=host --rm -ti -v /data:/tmp taskrabbit/elasticsearch-dump \
--bulk=true --input=/tmp/data-backup.json --output=http://elastic:changeme@localhost:9200

2.2) Install the Spring boot application Zenika analysis Backend

https://github.com/Zenika/Zenika-Resume-Analysis-Backend

Configure variables environnement before start the server :

google.client.clientId= 
google.client.clientSecret=
elasticsearch.url=http://localhost:9200
zenika.writing.resume.url=http://localhost:3000
USER_AUTH_API_USERNAME=
USER_AUTH_API_PASSWORD=
 	
With :
google.client.clientId et google.client.clientSecret : Information about communication with google api to use Authentification zenika member
elasticsearch.url : elastisearch URL started in local (by default on port 9200)
zenika.writing.resume.url: Zenika Resume instance, not mandatory if this application is not installed in local
USER_AUTH_API_USERNAME and USER_AUTH_API_PASSWORD : ids for the basic auth connection between the application Zenika Resume Analysis Backend and Zenika Resume, its not mandatory if Zenika Resume is not installed in local.
The login informations are not stored in github for security reason.

2.3) Install the Angular application Zenika Resume Analysis

https://github.com/Zenika/Zenika-Resume-Analysis

No environnement variable is necessary, the files inside the directory zenika-resume-analysis/src/environments declare the url of application Zenika Resume Analysis Backend.

 
