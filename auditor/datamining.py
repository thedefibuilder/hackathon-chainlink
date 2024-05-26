from pprint import pprint
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException
from time import sleep
import os
from dotenv import load_dotenv, find_dotenv
from utils import logger
import utils
import json
from pathlib import Path

logger.debug(find_dotenv())
load_dotenv(find_dotenv())

class DummyParser(dict):
   def __init__(self, *arg, **kw):
      super(DummyParser(), self).__init__(*arg, **kw)

class SourceParser:
    def __init__(self, html) -> None:
        self.raw_html = html
        self.soup = BeautifulSoup(self.raw_html, 'html.parser')
        self.code = self.parse_code()
        self.text = self.parse_text()

    def parse_code(self):
        return [code.text for code in self.soup.find_all('pre')]

    def parse_text(self):
        return '\n'.join([text.text for text in self.soup.find_all('p')])

    def __str__(self) -> str:
        return str(
            {key:self.__dict__[key] for key in self.__dict__ if key not in [
                'raw_html', 'soup'
            ]}
        )
    
class SherlockParser(SourceParser):
    def __init__(self, html) -> None:
        super().__init__(html)
        self.vulnerability_detail, self.vulnerability_code \
            = self.parse_vulnerability_detail(
                omit_code=bool(self.code)
            )
        self.summary = self.parse_summary()
        self.imapct = self.parse_impact()
        
    def parse_code(self):
        code_snippet = self.soup.find(id='code-snippet')
        if code_snippet:
            code_snippet = code_snippet.next_sibling
            code = []
            while code_snippet.next_sibling.name != 'h2':
                if code_snippet.name == 'pre':
                    code.append(code_snippet.text)
                elif code_snippet.name == 'p':
                    if not code_snippet.find('a'):
                        pass
                    else:
                        code.append(utils.get_github_code_snippet(
                            code_snippet.find('a').get('href')
                        ))
                code_snippet = code_snippet.next_sibling
            if code:
                logger.debug("Number of code snippets aquired: %s", len(code))
                return code
            
        return super().parse_code()
    
    def parse_summary(self):
        logger.debug("Parsing vulnerability summary")
        summary = self.soup.find(id='summary')
        if summary:
            summary = summary.next_sibling
            text = ''
            while summary.next_sibling.name != 'h2':
                text += summary.text 
                summary = summary.next_sibling
            
            return text.lstrip('\n')
    
    def parse_impact(self):
        logger.debug("Parsing vulnerability impact")
        impact = self.soup.find(id='impact')
        if impact:
            impact = impact.next_sibling
            text = ''
            while impact.next_sibling.name != 'h2':
                text += impact.text
                impact = impact.next_sibling
            
            return text.lstrip('\n')

    def parse_vulnerability_detail(self, omit_code=True):
        logger.debug("Parsing vulnerability details")
        detail = self.soup.find(id='vulnerability-detail')
        if detail:
            detail = detail.next_sibling
            text = ''
            code = []
            while detail.next_sibling.name != 'h2':
                if detail.name == 'pre' and omit_code:
                    logger.debug("Omitting code snippet")
                    pass
                elif detail.name == 'pre':
                    code.append(detail.text)
                else:
                    text += detail.text
                detail = detail.next_sibling
            
            return text.lstrip('\n'), code

        return 'No vulnerability details found', 'No code found'
        
    def parse(self, details_soup: BeautifulSoup):
        code = details_soup.find('pre').text
        text = details_soup.find('p').text
        return code, text

class CyfrinParser(SourceParser):
    def __init__(self, html) -> None:
        super().__init__(html)
        self.__dict__.update(self.parse_all())
        

    def parse_all(self) -> dict:
        p_elements = self.soup.find('p')
        page_parse = {'code': []}
        prev_section = 'preamble'

        while p_elements:
            if not p_elements.name:
                p_elements = p_elements.next_sibling
                continue

            logger.debug("Parsing page element: %s", p_elements.name)
            section = p_elements.find('strong')
            rem_section = False
            if section:
                section = section.text
                page_parse[section.rstrip(":")] = []
                prev_section = section
                rem_section = True
            else:
                section = prev_section
            
            if p_elements.name == 'p':
                text = p_elements.text
                if rem_section:
                    text = text.replace(section, '')
                page_parse[section.rstrip(":")].append(text)
            
            if p_elements.name == 'pre':
                if section == "Recommended Mitigation:":
                    pass
                else:
                    page_parse['code'].append(p_elements.text)

            p_elements = p_elements.next_sibling    

        logger.debug("Page Parse: %s", page_parse.keys())
        return page_parse  

class ConsenSysParser(SourceParser):
    def __init__(self, html) -> None:
        super().__init__(html)
        self.__dict__.update(self.parse_all())
        

    def parse_all(self) -> dict:
        p_elements = self.soup.find('h4') or self.soup.find('p')
        page_parse = {'code': [], "preamble": []}
        section = 'preamble'

        while p_elements:
            if not p_elements.name:
                p_elements = p_elements.next_sibling
                continue

            logger.debug("Parsing page element: %s", p_elements.name)
            if p_elements.name == 'h4':
                section = p_elements.text
                page_parse[section] = []
            
            if p_elements.name == 'p':
                text = p_elements.text
                page_parse[section].append(text)
            
            if p_elements.name == 'pre':
                if section == "Recommendation:":
                    pass
                else:
                    page_parse['code'].append(p_elements.text)

            p_elements = p_elements.next_sibling    

        logger.debug("Page Parse: %s", page_parse.keys())
        return page_parse 

class PashovParser(SourceParser):
    def __init__(self, html) -> None:
        super().__init__(html)
        self.__dict__.update(self.parse_all())
        

    def parse_all(self) -> dict:
        p_elements = self.soup.find('p')
        page_parse = {'code': []}
        prev_section = 'preamble'

        while p_elements:
            if not p_elements.name:
                p_elements = p_elements.next_sibling
                continue

            logger.debug("Parsing page element: %s", p_elements.name)
            section = p_elements.find('strong')
            rem_section = False
            if section:
                section = section.text
                page_parse[section.rstrip(":")] = []
                prev_section = section
                rem_section = True
            else:
                section = prev_section
            
            if p_elements.name == 'p':
                text = p_elements.text
                if rem_section:
                    text = text.replace(section, '')
                page_parse[section.rstrip(":")].append(text)
            
            if p_elements.name == 'pre':
                if section == "Recommendations:":
                    pass
                else:
                    page_parse['code'].append(p_elements.text)

            p_elements = p_elements.next_sibling    

        logger.debug("Page Parse: %s", page_parse.keys())
        return page_parse

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
        browser.find_element(
            By.XPATH, '//*[@id="community-modal"]/div/div/div/div[1]/button'
        ).click()
    except ElementClickInterceptedException:
        logger.debug("No Telegram popup")
    
    browser.find_element(
        By.XPATH, '//*[@id="announcement-modal"]/div/div[2]/button'
    ).click()
    #browser.find_element(By.XPATH, "//*[contains(text(), 'Dismiss')]").click()
    logger.debug("Popups handled")

def search_by_source(browser: webdriver.Chrome, source: str):
    logger.info("Searching for source: %s", source)
    search_field = browser.find_element(By.ID, 'react-select-3-input')
    logger.info(search_field)
    search_field.send_keys(source)
    search_field.send_keys(Keys.ENTER)

    sleep(2)
    search_button = browser.find_element(
        By.XPATH, 
        '//*[@id="root"]/div/div/main/div/div/div[2]/div[2]/div[2]/button[1]',
    )
    search_button.click()
    sleep(5)
    
def get_vulnerability_links(browser: webdriver.Chrome, backoff=1):
    pages = int(browser.find_element(
        By.CLASS_NAME, 'pagination'
    ).find_elements(By.TAG_NAME, 'li')[-2].text)
    next = browser.find_element(By.CLASS_NAME, 'pagination') \
                  .find_elements(By.TAG_NAME, 'li')[-1]
    logger.debug("Found %s pages of vulnerabilites", pages)
    links = []
    for page in range(pages):
        vulnerability_list = browser.find_element(
            By.XPATH, '//*[@id="root"]/div/div/main/div/div/div[4]/div[2]'
        )
        vulnerabilities = vulnerability_list.find_elements(
            By.CLASS_NAME, 'cursor-pointer'
        )
        logger.info(
            "Found %s vulnerabilities. Grabbing vulnerability links", 
            len(vulnerabilities)
        )
        for vulnerability in vulnerabilities:
            try:
                link = vulnerability.find_element(By.TAG_NAME, 'a') \
                                    .get_attribute('href')
                logger.debug("Vulnerability Link: %s", link)
                links.append(link)
            except NoSuchElementException:
                logger.error("No link found for vulnerability")
        logger.debug("Page %s of %s", page, pages)
        next.click()
        sleep(backoff)
    return links

def read_vulnerability(
        link:str, 
        browser: webdriver.Chrome, 
        sourceParser:SourceParser
) -> SourceParser:
    #have functions for different sources
    logger.info("Reading vulnerability: %s", link)
    browser.get(link)
    
    details = WebDriverWait(browser, 5) \
            .until(EC.visibility_of_element_located(
                (By.CLASS_NAME, "break-words")
            ))
    details_html = details.get_attribute('innerHTML')
    logger.debug("Parsing vulnerability details")
    components = sourceParser(details_html)
    return components


def main():
    url = 'https://solodit.xyz/'
    options = webdriver.ChromeOptions()
    #options.add_argument('--headless=new')
    browser = webdriver.Chrome(options=options)
    browser.get(url)
    login(browser)
    search_by_source(browser, "AuditOne")
    links = get_vulnerability_links(browser)
    print(links)
    sleep(20)

if __name__ == '__main__':
    parsers = {
        "Sherlock": SherlockParser,
        "Cyfrin": CyfrinParser,
        "ConsenSys": ConsenSysParser,
        "Pashov Audit Group": PashovParser,
        "Trust Security": CyfrinParser,
    }

    url = 'https://solodit.xyz/'
    options = webdriver.ChromeOptions()
    options.add_argument('--headless=new')
    browser = webdriver.Chrome(options=options)
    SOURCE = "Trust Security"
    FILESOURCE = SOURCE.replace(' ', '_')
    linkfile = Path(utils.DATADIR, f'{FILESOURCE}_vulnerability_links.txt')
    datafile = Path(utils.DATADIR, f'{FILESOURCE}_vulnerabilities_formatted.txt')
    
    browser.get(url)
    login(browser)


    if not os.path.exists(linkfile):
        search_by_source(browser, SOURCE)
        sleep(5)
        vulnerability_links = get_vulnerability_links(browser, backoff=2)
        with open(linkfile, 'w') as f:
            f.write('\n'.join(vulnerability_links))
    
    with open(linkfile, 'r') as f:
        vulnerability_links = f.readlines()
    
    logger.info("Found %s vulnerabilities in %s", len(vulnerability_links), SOURCE)
    for link in vulnerability_links:
        try:
            vulnerability = read_vulnerability(link, browser, parsers[SOURCE])
        except Exception as e:
            logger.error("Error reading vulnerability: %s", e)
            vulnerability = DummyParser({"error": f'Error reading vulnerability {e}'})
        with open(datafile, 'a', encoding='utf-8') as f:
            f.write('\n')
            f.write(link)
            f.write('-'*50)
            f.write('\n')
            f.write('----Start JSON----\n')
            f.write(json.dumps(
                {key:vulnerability.__dict__[key] for key in vulnerability.__dict__ 
                 if key not in ['raw_html', 'soup', 'text']}, 
                indent=4
            ))
            f.write('\n----End JSON----')
            f.write('\n')

        
    # vuln = read_vulnerability(
    #    'https://solodit.xyz/issues/trst-m-1-removing-a-trade-path-in-router-will-cause-serious-data-corruption-trust-security-none-orbital-finance-markdown_', 
    #     browser, 
    #     CyfrinParser
    # )
    # print(json.dumps({key:vuln.__dict__[key] for key in vuln.__dict__ if key not in ['raw_html', 'soup', 'text']}, indent=4))  
    
    
    browser.quit()

    






