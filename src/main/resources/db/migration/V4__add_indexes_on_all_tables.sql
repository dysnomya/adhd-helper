-- For user table
CREATE INDEX idx_user_google_id ON users (google_id);

-- For task table
CREATE INDEX idx_task_user_id ON tasks (user_id);

-- For category table
CREATE INDEX idx_category_user_id ON categories (user_id);