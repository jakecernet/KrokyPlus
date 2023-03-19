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


words_to_filter = ['iz', 'v', 'je', 'na', 's', 'in', 'z']


def sort_words_by_frequency(word_list):
    word_counts = Counter(word_list)

    sorted_words = sorted(word_counts.items(),
                          key=lambda x: x[1], reverse=True)

    return sorted_words


def recommend(x):
    final_score=0
    meni = narocilo_meni(x, username, password)
    print(meni[0])
    meni1=meni[0].split(" ")
    meni1=[x.replace(",", "") for x in meni1]
    meni1=[x.lower() for x in meni1]
    meni1 = [element for element in meni1 if element not in words_to_filter]
    scores_dict = dict(data)
    for i in meni1:
        try:
            score = scores_dict.get(i)
            final_score+=score
        except:
            pass

    
    

    print(meni1)
    print(final_score)
    return meni


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


words=parse_words(input_list)
data=sort_words_by_frequency(words)
print(data)

recommend(1)
