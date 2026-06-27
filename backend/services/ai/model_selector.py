"""
Selects the appropriate AI model for a given task.
"""

from backend.config.ai_config import DEFAULT_MODEL


TASK_MODEL_MAP = {
    "validation": DEFAULT_MODEL,
    "roadmap": DEFAULT_MODEL,
    "presentation": DEFAULT_MODEL,
    "report": DEFAULT_MODEL,
    "role_assignment": DEFAULT_MODEL,
}


def get_model(task_type: str) -> str:
    """
    Returns the AI model to use for a given task.
    """

    return TASK_MODEL_MAP.get(task_type, DEFAULT_MODEL)