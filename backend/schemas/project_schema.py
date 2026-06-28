"""
schemas/project_schema.py

Pydantic schemas for Project APIs.

Responsibilities:
- Request validation
- Response serialization
- API contracts

No database logic should exist here.
"""

from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


# ==========================================================
# ENUMS
# ==========================================================

class ProjectStatus(str, Enum):
    """Allowed project lifecycle states."""

    PLANNING = "planning"
    ACTIVE = "active"
    COMPLETED = "completed"


# ==========================================================
# BASE SCHEMA
# ==========================================================

class ProjectBase(BaseModel):
    """
    Shared project fields.
    """

    title: str = Field(
        ...,
        min_length=3,
        max_length=200,
        description="Project title"
    )

    description: Optional[str] = Field(
        default=None,
        description="Detailed description of the project"
    )

    idea: str = Field(
        ...,
        min_length=20,
        description="Startup idea"
    )

    timeline_weeks: int = Field(
        ...,
        ge=1,
        le=520,
        description="Estimated project duration in weeks"
    )


# ==========================================================
# CREATE
# ==========================================================

class ProjectCreate(ProjectBase):
    """
    Request body for creating a project.

    created_by is derived from authentication.
    """
    pass


# ==========================================================
# UPDATE
# ==========================================================

class ProjectUpdate(BaseModel):
    """
    Partial update schema.
    """

    title: Optional[str] = Field(
        default=None,
        min_length=3,
        max_length=200
    )

    description: Optional[str] = None

    idea: Optional[str] = Field(
        default=None,
        min_length=20
    )

    timeline_weeks: Optional[int] = Field(
        default=None,
        ge=1,
        le=520
    )

    status: Optional[ProjectStatus] = None


# ==========================================================
# RESPONSE
# ==========================================================

class ProjectResponse(ProjectBase):
    """
    Complete project representation.
    """

    id: int

    status: ProjectStatus

    created_by: int

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================================
# SUMMARY
# ==========================================================

class ProjectSummary(BaseModel):
    """
    Lightweight representation for listing projects.
    """

    id: int

    title: str

    status: ProjectStatus

    timeline_weeks: int

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================================
# LIST RESPONSE
# ==========================================================

class ProjectListResponse(BaseModel):
    """
    Paginated list response.
    """

    total: int

    page: int

    page_size: int

    projects: list[ProjectSummary]


# ==========================================================
# DASHBOARD RESPONSE
# ==========================================================

class DashboardResponse(BaseModel):
    """
    Dashboard overview for a project.

    Additional AI metrics can be added later.
    """

    project: ProjectResponse

    total_tasks: int = 0

    completed_tasks: int = 0

    team_members: int = 0

    progress_percentage: float = 0.0

    validation_completed: bool = False

    roadmap_generated: bool = False

    latest_report_generated: bool = False


# ==========================================================
# COMMON RESPONSE
# ==========================================================

class ProjectMessage(BaseModel):
    """
    Generic success response.
    """

    message: str