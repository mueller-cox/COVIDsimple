CREATE TABLE articles (
    source character varying(30) NOT NULL,
    url character varying NOT NULL,
    name character varying,
    date character varying,
    rating_count integer,
    rating_sum integer,
    PRIMARY KEY (url)
);




