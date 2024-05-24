from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.select import Select
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException
from time import sleep
import os
from dotenv import load_dotenv, find_dotenv
from utils import logger

logger.debug(find_dotenv())
load_dotenv(find_dotenv())

def login(browser: webdriver.Chrome):
    logger.info("Logging in...")
    browser.find_element(By.CLASS_NAME, 'abtn-hover').click()
    sleep(2)
    email_field = browser.find_element(By.ID, value='email')
    logger.info("Email: %s", os.environ.get("SOLIDIT_EMAIL"))
    email_field.send_keys(os.environ.get("SOLIDIT_EMAIL"))

    password_field = browser.find_element(By.ID, value='password')
    password_field.send_keys(os.environ.get("SOLIDIT_PASSWORD"))

    browser.find_element(By.CLASS_NAME, 'btn-primary').click()
    logger.info("Logged in successfully")

    #Handle login popups//Click two popups
    logger.debug("Handling popups")
    sleep(2)
    try:
        browser.find_element(By.XPATH, '//*[@id="community-modal"]/div/div/div/div[1]/button').click()
    except ElementClickInterceptedException:
        logger.debug("No Telegram popup")
    
    browser.find_element(By.XPATH, '//*[@id="announcement-modal"]/div/div[2]/button').click()
    #browser.find_element(By.XPATH, "//*[contains(text(), 'Dismiss')]").click()
    logger.debug("Popups handled")

def search_by_source(browser: webdriver.Chrome, source: str):
    logger.info("Searching for source: %s", source)
    search_field = browser.find_element(By.ID, 'react-select-3-input')
    logger.info(search_field)
    search_field.send_keys(source)
    search_field.send_keys(Keys.ENTER)

    sleep(2)
    search_button = browser.find_element(By.XPATH, '//*[@id="root"]/div/div/main/div/div/div[2]/div[2]/div[2]/button[1]')
    search_button.click()
    
def get_vulnerability_links(browser: webdriver.Chrome):
    vulnerability_list = browser.find_element(By.XPATH, '//*[@id="root"]/div/div/main/div/div/div[4]/div[2]')
    vulnerabilities = vulnerability_list.find_elements(By.CLASS_NAME, 'cursor-pointer')
    
    links = []
    logger.info("Found %s vulnerabilities. Grabbing vulnerability links", len(vulnerabilities))
    for vulnerability in vulnerabilities:
        try:
            link = vulnerability.find_element(By.TAG_NAME, 'a').get_attribute('href')
            logger.debug("Vulnerability Link: %s", link)
            links.append(link)
        except NoSuchElementException:
            logger.error("No link found for vulnerability")

    return links

def read_vulnerability(browser: webdriver.Chrome, source):
    #have functions for different sources
    pass


options = webdriver.ChromeOptions()
#options.add_argument('--headless=new')
browser = webdriver.Chrome(options=options)

url = 'https://solodit.xyz/'

browser.get(url)
login(browser)
search_by_source(browser, "AuditOne")
sleep(5)
links = get_vulnerability_links(browser)
print(links)
sleep(20)



