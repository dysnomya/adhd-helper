UPDATE boss
SET max_hp = CEIL(POW(1.2, boss_level))
WHERE max_hp = 0;

UPDATE pimpus_profile p
    JOIN boss b ON p.current_boss_id = b.id
SET p.current_boss_hp = b.max_hp
WHERE current_boss_hp = 0;