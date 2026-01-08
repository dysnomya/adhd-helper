INSERT INTO pimpus_profile (user_id,
                            level,
                            current_exp,
                            exp_to_next_level,
                            inventory_points,
                            current_boss_id)
SELECT u.id AS user_id,
       0    AS level,
       0    AS current_exp,
       10   AS exp_to_next_level,
       0    AS inventory_points,
       1    AS current_boss_id
FROM `users` u
WHERE NOT EXISTS (SELECT 1
                  FROM pimpus_profile pp
                  WHERE pp.user_id = u.id);
