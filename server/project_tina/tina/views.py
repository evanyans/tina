from django.shortcuts import render
from django.http import JsonResponse
import requests
import environ

env = environ.Env()
environ.Env.read_env()
API_KEY = env('API_KEY')
#ML_KEY = env('ML_KEY')

API_URL = "https://api-inference.huggingface.co/models/ProsusAI/finbert"
headers = {"Authorization": "Bearer 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"}

# Create your views here.
def main(request):
    user_input = request.GET.get('q')
    print(user_input)
    response = requests.get(f"https://newsapi.org/v2/everything?q={user_input}&apiKey={API_KEY}")
    data = response.json()

    articles = data.get("articles", [])

    titles = [article['title'] for article in articles]
    parsed_data = requests.post(API_URL, headers=headers, json={"inputs": titles})
    initial_response = parsed_data.json()
    if 'estimated_time' in initial_response or 'job_id' in initial_response:
        # Use a loop to periodically check for results
        for _ in range(5):  # Adjust the number of attempts as needed
            time.sleep(10)  # Wait for 10 seconds before checking again. Adjust as needed.

            # Make a follow-up request to check if results are ready
            follow_up_response = requests.get(follow_up_url, headers=headers)  # Adjust follow_up_url accordingly
            sentiment_results = follow_up_response.json()

            # Check if the results are ready
            if 'results' in sentiment_results:  # Adjust the condition based on the actual API response structure
                break
    # If results are directly available in the initial response
    else:
        sentiment_results = initial_response

    final_data = list(map(lambda x, y: {'sentiment': y, 'article': x}, articles, parsed_data.json()))
    return JsonResponse(final_data, safe=False)

