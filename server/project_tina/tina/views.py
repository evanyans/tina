from django.shortcuts import render
from django.http import JsonResponse
import requests
import environ
import time
from datetime import datetime

env = environ.Env()
environ.Env.read_env()
API_KEY = env('API_KEY')
ML_KEY = env('ML_KEY')

API_URL = "https://api-inference.huggingface.co/models/ProsusAI/finbert"
headers = {"Authorization": f"Bearer {ML_KEY}"}

# Create your views here.
def main(request):
    user_input = request.GET.get('q')
    from_input = request.GET.get('from')
    to_input = request.GET.get('to')

    from_str_modified = from_input.replace('GMT', '').replace(' (Pacific Standard Time)', '')
    dt_one = datetime.strptime(from_str_modified, '%a %b %d %Y %H:%M:%S %z')
    from_parsed = dt_one.strftime('%Y-%m-%d')

    to_str_modified = to_input.replace('GMT', '').replace(' (Pacific Standard Time)', '')
    dt_two = datetime.strptime(to_str_modified, '%a %b %d %Y %H:%M:%S %z')
    to_parsed = dt_two.strftime('%Y-%m-%d')

    print(user_input)
    print(from_parsed)
    print(to_parsed)
    print(f"https://newsapi.org/v2/everything?q={user_input}&from={from_parsed}&to={to_parsed}&sortBy=popularity&apiKey={API_KEY}")
    response = requests.get(f"https://newsapi.org/v2/everything?q={user_input}&from={from_parsed}&to={to_parsed}&sortBy=popularity&apiKey={API_KEY}")
    data = response.json()

    articles = data.get("articles", [])

    titles = [article['title'] for article in articles]
    parsed_data = requests.post(API_URL, headers=headers, json={"inputs": titles, "options": {"wait_for_model": True}})

    final_data = list(map(lambda x, y: {'sentiment': y, 'article': x}, articles, parsed_data.json()))
    return JsonResponse(final_data, safe=False)

