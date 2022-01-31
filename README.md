# Replication Package for the ICSA 2022 Artifact Evaluation Track
This is the replication package of the paper entitled _"Web APIs Structures and Data Models Analysis"_ by Souhaila Serbout, Fabio Di Lauro, and Cesare Pautassoo, accepted to the Technical Track of the 19th IEEE International Conference on Software Architecture (ICSA 2022). 

The work consists on an empirical study performed on an set of 40,042 OpenAPI Specifications collected from Open Source repositories on Github. 
In this repository we publish the metadata of the studied APIs beside the computed metrics discussed in the paper in: https://github.com/USI-INF-Software/ICSA2022-Web-APIs-Structures-and-Data-Models-Analysis/blob/main/OASCollection_and_metrics.json.zip?raw=true (JSON format).

The data schema of the entries representing each API is:

```
{
    "id": {"type" : "string", "required" : true , "description" : "a given id for the API"},
    "metadata": {
        "raw_github": { "type" : "string", "required" : true , "description" : "raw github url where the OAS specification can be downloaded from"},
        "last_update": { "type" : "string", "required" : true , "description" : "date of the last update of the OAS specification", "format" : "date-time"},
        "repository_created_at": { "type" : "string", "required" : true , "description" : "date of the creation of the repository", "format" : "date-time"},
        "isValid": { "type" : "boolean", "required" : true , "description" : "is the OAS specification valid"},
        "forked": { "type" : "integer", "required" : true , "description" : "the number of duplicates found"},
        "api": {
            "openapi": { "type" : "string", "required" : false , "description" : "the version of the OAS specification metamodel"},
            "info": {
                "version": { "type" : "string", "required" : false , "description" : "the version of the API"},
                "title": { "type" : "string", "required" : false , "description" : "the title of the API"}
            }
        }
    },
    "metrics": {
        "paths": { "type" : "integer", "required" : true , "description" : "the number of paths in the API"},
        "methods": { "type" : "integer", "required" : true , "description" : "the number of methods in the API"},
        "unique_used_schemas": { "type" : "integer", "required" : true , "description" : "the number of unique schemas used in the API"},
        "unique_defined_schemas": { "type" : "integer", "required" : true , "description" : "the number of unique schemas defined in the API"},
        "reused_schemas": { "type" : "integer", "required" : true , "description" : "the number of schemas reused in the API"},
        "reuse_amount": { "type" : "integer", "required" : true , "description" : "the amount of schemas reused in the API"},
        "usage_amount": { "type" : "integer", "required" : true , "description" : "the rate of schemas used in the API"},
        "embeddedSchemas": { "type" : "integer", "required" : true , "description" : "the number of embedded schemas in the API"},
        "referencedSchemas": { "type" : "integer", "required" : true , "description" : "the number of referenced schemas in the API"},
        "breadth": { "type" : "integer", "required" : true , "description" : "Number of top-level distinct path segments"},
        "depth": { "type" : "integer", "required" : true , "description" : "Maximum path length (in terms of path segments)"},
        "age":  { "type" : "integer", "required" : true , "description" : "age of the API by days"},
        "popularity": { "type" : "integer", "required" : true , "description" : "popularity of the API by number of forks"},
        "methodsperPath": { "type" : "integer", "required" : true , "description" : "the average number of methods per path in the API"},
        "httpmethods": {"type" : "integer", "required" : true , "description" : "the number of distinct http methods used in the API"},
    }
}
```

The paper provides more details on the API Structure and Data Model Size metrics definition.

Please contact Souhaila Serbout (souhaila.serbout@usi.ch) for any questions.
