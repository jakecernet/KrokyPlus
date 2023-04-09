from meni_get import narocilo_meni
from collections import Counter
import re
creds = open("food_log.txt", "r", encoding="utf-8")
creds_content = creds.readlines()[0]

username, password = creds_content.split(";")
username = username.replace("\n", "")
password = password.replace("\n", "")

creds.close()

file = open("food_log.txt", "r", encoding="utf-8")
input_list = file.read().split("\n")[1::]


words_to_filter = ['iz', 'v', 'je', 'na', 's', 'in', 'z', "napitek", "plastneki", "voda"]


def sort_words_by_frequency(word_list):
    word_counts = Counter(word_list)

    sorted_words = sorted(word_counts.items(),
                          key=lambda x: x[1], reverse=True)

    return sorted_words


def parse_words(input_list):
    words = []

    for word in input_list:
        word = word.lower()
        word = word.split(",")
        for k in word:
            k = k.split()
            words.extend(k)

    words = [word for word in words if not word == ""]

    for word in words:
        for i in words_to_filter:
            if word == i:
                try:
                    words.pop(words.index(word))
                except:
                    pass
    return words

def recommend(teden, dan, data):
    meni = narocilo_meni(teden, dan, username, password)
    daily_menu = meni
    print(daily_menu)
    scores = []
    for menu in daily_menu:
        score = 0
        for item, count in data:
            if item.lower() in menu.lower():
                score += count
        scores.append(score)
    best_index = scores.index(max(scores))
    print(scores)
    print(best_index)
    return daily_menu[best_index], best_index



import re

def recommend_menu(order_history, menus):
    keywords_count = {}
    for item in order_history:
        keywords = re.findall(r'\b\w+\b', item.lower())
        for keyword in keywords:
            if keyword in keywords_count:
                keywords_count[keyword] += 1
            else:
                keywords_count[keyword] = 1
    best_menu = None
    best_score = -1
    for menu in menus:
        keywords = re.findall(r'\b\w+\b', menu.lower())
        score = 0
        for keyword in keywords:
            if keyword in keywords_count:
                score += keywords_count[keyword]
        if score > best_score:
            best_menu = menu
            best_score = score
    return best_menu


a=recommend_menu(input_list, narocilo_meni(1, 4, username, password))
print(a)