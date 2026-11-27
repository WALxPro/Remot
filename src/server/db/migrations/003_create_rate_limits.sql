CREATE TABLE public.rate_limits (
  key VARCHAR(255) PRIMARY KEY,
  points INTEGER NOT NULL DEFAULT 0,
  expire BIGINT
);

CREATE INDEX idx_rate_limits_expire
ON public.rate_limits(expire);

ALTER TABLE public.rate_limits
ENABLE ROW LEVEL SECURITY;