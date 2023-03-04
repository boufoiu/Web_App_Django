from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
import os
from pathlib import Path

import chromedriver_autoinstaller
from selenium.webdriver.common.keys import Keys

#teest fonctionnel de la fonction de création d'une annonce

chromedriver_autoinstaller.install()
options = webdriver.ChromeOptions()
options.add_argument('user-data-dir=' + os.getcwd() + '/chrome_profile')
driver = webdriver.Chrome(options=options)

driver.get("http://127.0.0.1:3000/connect")
WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".disconnect")))
time.sleep(1)
driver.get("http://127.0.0.1:3000/home/create-offer")
time.sleep(2)

title = driver.find_element_by_id("title")
title.send_keys("Test Offer Title")

description = driver.find_element_by_id("description")
description.send_keys("Test Offer Description")

price = driver.find_element_by_id("price")
price.send_keys("100")

wilaya = driver.find_element_by_id("wilaya")
wilaya.send_keys("Algiers")

commune = driver.find_element_by_id("commune")
commune.send_keys("Hydra")

category = driver.find_element_by_id("category")
category.click()
category.send_keys(Keys.DOWN)
category.send_keys(Keys.RETURN)

address = driver.find_element_by_id("address")
address.send_keys("1 Main Street")

type_ = driver.find_element_by_id("type")
type_.send_keys("Villa")

area = driver.find_element_by_id("area")
area.send_keys("200")

path = Path(os.getcwd())
dir = path.resolve().parent

images_directory = os.path.join(dir, 'database', 'images')
file1 = os.path.join(images_directory, '22974_20221226_103830.jpg')
file2 = os.path.join(images_directory, '78819_20221208_113513.jpg')

images = driver.find_element_by_id("files")
images.send_keys(file1)
images.send_keys(file2)

time.sleep(3)

submit_button = driver.find_element_by_class_name("start-button-2")
submit_button.click()