import logging

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
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    # Add the handlers to the logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger

logger = setup_logger()