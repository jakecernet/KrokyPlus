from meni_get import narocilo_meni
from collections import Counter
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

a=narocilo_meni(1, 0, username, password)
print(a)
"""
words=parse_words(input_list)
data=sort_words_by_frequency(words)


print(recommend(1,1, data))
"""