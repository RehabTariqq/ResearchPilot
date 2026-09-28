import os

from dotenv import load_dotenv
from huggingface_hub import InferenceClient


load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

client = InferenceClient(
    token=HF_TOKEN
)


def generate_answer(question, context):
    prompt = f"""
You are ResearchPilot, a simple research assistant.

Answer the user's question using only the provided research context.

If the context does not contain enough information to answer,
say that the available sources do not provide enough information.

User question:
{question}

Research context:
{context}

Give a clear and concise answer.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return response.choices[0].message.content