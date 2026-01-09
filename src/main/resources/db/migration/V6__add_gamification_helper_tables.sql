CREATE TABLE title
(
    id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE boss
(
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(255) NOT NULL,
    required_level   INT          NOT NULL,
    color_hue_rotate SMALLINT     NOT NULL,
    reward_title_id  BIGINT       NOT NULL,

    CONSTRAINT fk_boss_reward_title
        FOREIGN KEY (reward_title_id)
            REFERENCES title (id)
);