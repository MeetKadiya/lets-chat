-- Default Interest Seeds
INSERT INTO interests (slug, label, is_active) VALUES
('gaming', 'Gaming', true),
('music', 'Music', true),
('anime', 'Anime', true),
('movies', 'Movies & TV', true),
('technology', 'Technology & Coding', true),
('sports', 'Sports & Fitness', true)
ON CONFLICT (slug) DO UPDATE SET label = EXCLUDED.label, is_active = EXCLUDED.is_active;
