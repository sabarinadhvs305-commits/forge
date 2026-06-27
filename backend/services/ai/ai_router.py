"""
Routes AI requests to the appropriate AI service.
"""

from backend.services.ai.gemini_service import generate_response
from backend.services.ai.model_selector import get_model


def generate_ai_response(
    task_type: str,
    prompt: str
) -> str:
    """
    Generates an AI response based on the task type.
    """

    model = get_model(task_type)

    return generate_response(
        prompt=prompt,
        model=model
    )