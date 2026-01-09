ALTER TABLE tasks
    MODIFY COLUMN user_id BIGINT NOT NULL;

ALTER TABLE categories
    MODIFY COLUMN user_id BIGINT NOT NULL;

ALTER TABLE categories
    ADD CONSTRAINT fk_categories_user FOREIGN KEY (user_id) REFERENCES `users` (id) ON DELETE CASCADE;

-- FIX INVALID CATEGORIES
UPDATE tasks t
    LEFT JOIN categories c ON t.category_id = c.id
SET t.category_id = NULL
WHERE t.category_id IS NOT NULL
  AND c.id IS NULL;

ALTER TABLE tasks
    ADD CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_tasks_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL,
    ADD CONSTRAINT fk_tasks_parent FOREIGN KEY (parent_id) REFERENCES tasks (id) ON DELETE SET NULL;

CREATE INDEX idx_tasks_category_id ON tasks (category_id);
CREATE INDEX idx_tasks_parent_id ON tasks (parent_id);