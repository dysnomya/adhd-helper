-- 1. Drop existing primary key
ALTER TABLE users
    DROP PRIMARY KEY;

-- 2. Rename old id -> google_id
ALTER TABLE users
    CHANGE COLUMN id google_id VARCHAR(256) NOT NULL;

-- 3. Add new BIGINT id AND make it PRIMARY KEY
ALTER TABLE users
    ADD COLUMN id BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (id);

-- 4. Make google_id unique
ALTER TABLE users
    ADD CONSTRAINT uq_users_google_id UNIQUE (google_id);
