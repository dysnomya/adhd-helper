ALTER TABLE boss
    ADD COLUMN max_hp BIGINT NOT NULL DEFAULT 0;;

ALTER TABLE pimpus_profile
    ADD COLUMN current_boss_hp BIGINT NOT NULL DEFAULT 0;

ALTER TABLE pimpus_profile
    ADD COLUMN bossfight_attempts BIGINT NOT NULL DEFAULT 0;

ALTER TABLE boss
    RENAME COLUMN required_level TO boss_level;