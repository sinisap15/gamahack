- Veto schema
    CREATE SCHEMA IF NOT EXISTS veto;

    CREATE TABLE veto.blacklisted_players
    (
        player_id            UUID        NOT NULL,
        inserted             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deactivated          TIMESTAMPTZ NULL,
        created_on_veto      TIMESTAMPTZ NOT NULL,
        expires_on_veto      TIMESTAMPTZ NULL,
        "id"                 SERIAL      NOT NULL PRIMARY KEY,
        is_active            boolean     NOT NULL DEFAULT TRUE,
        barrier_id           VARCHAR(16) NOT NULL,
        responsible_provider text        NOT NULL,
        "scope"              text        NOT NULL
    );

    CREATE INDEX ON users.blacklisted_players USING btree (playerid, active);

    CREATE TABLE veto.whitelisted_players
    (
        player_id           UUID,
        inserted            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "id"                SERIAL4 NOT NULL PRIMARY KEY,
        barrier_id          VARCHAR(14) NOT NULL
    );

    CREATE TABLE veto.async_process_queue
    (
        player_id           UUID,
        inserted            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        processed           TIMESTAMPTZ NULL,
        "id"                SERIAL4 NOT NULL PRIMARY KEY
    );
