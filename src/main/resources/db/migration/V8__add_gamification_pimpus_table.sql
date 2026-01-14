CREATE TABLE pimpus_profile
(
    id                BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id           BIGINT NOT NULL,

    level             INT,
    current_exp       INT    NOT NULL,
    exp_to_next_level INT    NOT NULL,
    inventory_points  INT    NOT NULL,

    current_title_id  BIGINT,
    current_boss_id   BIGINT,

    CONSTRAINT uq_pimpus_user UNIQUE (user_id),

    CONSTRAINT fk_pimpus_user
        FOREIGN KEY (user_id)
            REFERENCES `users` (id),

    CONSTRAINT fk_pimpus_title
        FOREIGN KEY (current_title_id)
            REFERENCES title (id),

    CONSTRAINT fk_pimpus_boss
        FOREIGN KEY (current_boss_id)
            REFERENCES boss (id)
);