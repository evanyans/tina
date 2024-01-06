from django.shortcuts import render
from django.http import JsonResponse
import requests
import time
from datetime import datetime
import os

API_KEY = os.getenv('API_KEY', '')
ML_KEY = os.getenv('ML_KEY', '')

API_URL = "https://api-inference.huggingface.co/models/ProsusAI/finbert"
headers = {"Authorization": f"Bearer {ML_KEY}"}

# Create your views here.
def main(request):
    user_input = request.GET.get('q')
    from_input = request.GET.get('from')
    to_input = request.GET.get('to')

    from_parsed = parse_date(from_input[:15])
    to_parsed = parse_date(to_input[:15])

    #print(f"https://newsapi.org/v2/everything?q={user_input}&from={from_parsed}&to={to_parsed}&sortBy=popularity&apiKey={API_KEY}")
    response = requests.get(f"https://newsapi.org/v2/everything?q={user_input}&from={from_parsed}&to={to_parsed}&sortBy=popularity&apiKey={API_KEY}")
    data = response.json()

    articles = data.get("articles", [])

    titles = [article['title'] for article in articles]
    parsed_data = requests.post(API_URL, headers=headers, json={"inputs": titles, "options": {"wait_for_model": True}})

    final_data = list(map(lambda x, y: {'sentiment': y, 'article': x}, articles, parsed_data.json()))
  
    return JsonResponse(final_data, safe=False)

def parse_date(date_str):
    # Parse the string in the format 'Fri Dec 22 2023'
    dt = datetime.strptime(date_str, '%a %b %d %Y')
    return dt.strftime('%Y-%m-%d')

