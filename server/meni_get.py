import requests
import re
from datetime import datetime
log_list = []

def teden(teden, username, password):

	data = {
	    "username": username,
	    "password": password,

	}



	day = -4

	login_url = "https://www.kroky.si/2016/?mod=register&action=login"

	response = requests.post(login_url, data={
	    "username": data["username"],
	    "password": data["password"]
	})

	session_cookie = response.cookies["PHPSESSID"]

	menu_url = f"https://www.kroky.si/2016/?mod=register&action=order&pos={teden}"
	headers = {"Cookie": f"PHPSESSID={session_cookie}"}

	response = requests.get(menu_url, headers=headers)
	menu_page = response.text

	menu_names = re.findall(r'<span class="lepo_ime">([^<]+)</span>', menu_page)
	selected_ids = [int(id) for id in re.findall(
		r'menu_id="(\d{1})".*checked', menu_page)]

	stevilo_dni = int(len(menu_names)/11)+1
	daily_menu=[]
	for i in range(1, 11):
		    daily_menu.append(menu_names[int(len(menu_names)/11)*i+day-1])
	return daily_menu


