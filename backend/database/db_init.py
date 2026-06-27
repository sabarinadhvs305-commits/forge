from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.engine import make_url

from backend.config.settings import settings


SCHEMA_PATH = Path(__file__).with_name("schema.sql")


def _get_server_database_url():
    database_url = make_url(settings.DATABASE_URL)
    return database_url.set(database=None)


def _load_schema_statements():
    schema_sql = SCHEMA_PATH.read_text(encoding="utf-8")
    return [
        statement.strip()
        for statement in schema_sql.split(";")
        if statement.strip()
    ]


def initialize_database():
    engine = create_engine(
        _get_server_database_url(),
        pool_pre_ping=True
    )

    with engine.begin() as connection:
        for statement in _load_schema_statements():
            connection.exec_driver_sql(statement)

    print("Database initialized successfully")


if __name__ == "__main__":
    initialize_database()
