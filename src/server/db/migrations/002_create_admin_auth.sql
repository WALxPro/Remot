CREATE TABLE public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email VARCHAR(255) NOT NULL UNIQUE
        CHECK (email = LOWER(TRIM(email))),

    password_hash TEXT NOT NULL,

    singleton BOOLEAN NOT NULL DEFAULT TRUE
        UNIQUE CHECK (singleton = TRUE),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE public.admin_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    admin_id UUID NOT NULL
        REFERENCES public.admins(id)
        ON DELETE CASCADE,

    token_hash TEXT NOT NULL UNIQUE,

    expires_at TIMESTAMPTZ NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CHECK (expires_at > created_at)
);


CREATE INDEX idx_admin_sessions_admin_id
    ON public.admin_sessions(admin_id);


CREATE INDEX idx_admin_sessions_expires_at
    ON public.admin_sessions(expires_at);


ALTER TABLE public.admins
    ENABLE ROW LEVEL SECURITY;


ALTER TABLE public.admin_sessions
    ENABLE ROW LEVEL SECURITY;