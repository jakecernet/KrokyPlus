file=open("food_log.txt", "r", encoding="utf-8")
input_list= file.read().split("\n")

from collections import Counter

def sort_words_by_frequency(word_list):
    word_counts = Counter(word_list)
    
    sorted_words = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)
    
    return sorted_words


words_to_filter = ["iz", "v", "s", "je", "na", 's', 'in', 'z']

words = []



for word in input_list:
    word=word.lower()
    word=word.split(" ")
    words.extend(word)


words=[word.strip() for word in words]
words=[word for word in words if not word==""]

for word in words:
    for i in words_to_filter:
        if word==i:
            words.pop(words.index(word))


print(sort_words_by_frequency(words)[-1])








