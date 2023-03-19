import requests
import re
from datetime import datetime
log_list=[]
username = "ČadLin"
password = "hlamehhit"

def hrana_teden(teden, username, password):
	user_food_list=[]

	data = {
	    "username": username,
	    "password": password,

	}


	dan=1


	day = dan-1


	login_url = "https://www.kroky.si/2016/?mod=register&action=login"


	response = requests.post(login_url, data={
	    "username": data["username"],
	    "password": data["password"]
	})

	session_cookie = response.cookies["PHPSESSID"]

	menu_url = f"https://www.kroky.si/2016/?mod=register&action=order&pos=-{teden}"
	headers = {"Cookie": f"PHPSESSID={session_cookie}"}

	response = requests.get(menu_url, headers=headers)
	menu_page = response.text


	menu_names = re.findall(r'<span class="lepo_ime">([^<]+)</span>', menu_page)
	selected_ids = [int(id) for id in re.findall(r'menu_id="(\d{1})".*checked', menu_page)]

	stevilo_dni=int(len(menu_names)/11)+1

	for day in range(1, stevilo_dni):
		try:
			daily_menu=[]
			for i in range(0,11):
				daily_menu.append(menu_names[int(len(menu_names)/11)*i+day-1])

			regex_pattern = fr'class="radio dan{day}"[^>]*'
			result = re.findall(regex_pattern, menu_page)
			for item in result:
				match = re.search(r'checked', item)
				if match:
					result=item
			pattern = r'class="radio dan(\d+)"\s+menu_id="(\d+)"[^>]*\s+checked'
			matches = re.findall(pattern, result)
			food_id=int(matches[0][1])


			user_food_list.append(daily_menu[food_id-1])
		except:
			pass
	return user_food_list
  
def delta_tedni():

	
	current_date = datetime.now()
	today = datetime.today()
	if today.month < 9:
		start_date = datetime(today.year-1, 9, 1)
	else:
		start_date = datetime(today.year, 9, 1)

	time_from_start = current_date - start_date
	num_weeks = int(time_from_start.days/7)+1
	return num_weeks



tedni=delta_tedni()

food_log=open("food_log.txt", "w", encoding="utf-8")


print(tedni)
for i in range(0, tedni):
	a=hrana_teden(i, username, password)
	print(a)
	log_list.extend(a)
	for z in a:
		food_log.write(z)
		food_log.write("\n")



	

