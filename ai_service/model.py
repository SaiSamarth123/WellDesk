import random
from datetime import datetime, timedelta


# Example task prioritization function
def prioritize_tasks(tasks):
    for task in tasks:
        # Simulate prioritization based on urgency and importance
        task["priority"] = random.randint(1, 5)  # Priority from 1 to 5
        task["time_estimate"] = estimate_time(task)  # Time estimate in minutes
    # Sort tasks by priority and time estimate
    return sorted(tasks, key=lambda x: (x["priority"], x["time_estimate"]))


def estimate_time(task):
    # Simulate time estimation based on historical data
    return random.randint(1, 4) * 25  # Time estimate in minutes
