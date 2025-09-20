from google.adk.agents import SequentialAgent
from .technology_agent.agent import technology_agent
from ..responder_agent.agent import responder_agent

# Create the sequential agent with minimal callback
tech_pipeline = SequentialAgent(
    name="tech_pipeline",
    sub_agents=[technology_agent, responder_agent],
    description="Orchestrates a sequence of agents to provide personalized tech career guidance. It first runs an interactive assessment to determine a career match, then passes the result to a responder agent to formulate the final answer for the user.",
)
