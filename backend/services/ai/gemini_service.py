from google import genai

from backend.config.ai_config import (
    GEMINI_API_KEY,
    DEFAULT_MODEL,
)

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_response(prompt: str, model: str = DEFAULT_MODEL) -> str:
    """
    Sends a prompt to Gemini and returns the generated response.
    """

    try:

        response = client.models.generate_content(
            model=model,
            contents=prompt
        )

        return response.text

    except Exception as e:

        raise Exception(f"Gemini API Error: {e}")