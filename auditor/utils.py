import logging
import requests


class NotValidSnippetError(Exception):
    pass

def setup_logger():
    # Create a logger
    logger = logging.getLogger('audit_logger')
    logger.setLevel(logging.DEBUG)  # Set the logging level

    # Create a file handler
    file_handler = logging.FileHandler('logfile.log')
    file_handler.setLevel(logging.DEBUG)  # Set the logging level

    # Create a console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)  # Set the logging level

    # Create a formatter and add it to the handlers
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(module)s - %(funcName)s - %(message)s')
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    # Add the handlers to the logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger

logger = setup_logger()

def get_github_code_snippet(link:str):
    if not "github" in link:
        logger.error("Not a github link, skipping: %s", link)
        return ''
    logger.debug("Getting code snippet from %s", link)
    if 'gist.github.com' in link:
        link.replace('github.com', 'githubusercontent.com')
        link = link.rstrip('/') + '/raw'
    else:
        link = link.replace('github.com', 'raw.githubusercontent.com')
    
    link = link.replace('/blob/', '/')
    logger.debug("Modified link: %s", link)
    try:
        lines = link.split('#')[-1]
        lines = lines.split('-')
        lines = [int(i[1:]) for i in lines]
        if len(lines) == 1:
            lines.append(lines[0])
        if lines[1] < lines[0]:
            raise NotValidSnippetError
        
    except ValueError:
        return requests.get(link).text
    
    except NotValidSnippetError:
        logger.error("Invalid snippet: %s", link)
        return ''
    
    response = requests.get(link)
    if response.status_code == 200:
        logger.info("Successfully got code snippet from %s", link)
        return '\n'.join(response.text.split('\n')[lines[0]-1:lines[1]])

    else:
        logger.error("Error getting code snippet from %s", link)
        return None

if __name__ == '__main__':
    link = 'https://gist.github.com/Trumpero/adbcd84c33f71856dbf379f581e8abbb'

    code = get_github_code_snippet(link)
    print(code)
