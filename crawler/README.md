# Documentation for HTMLParser and Crawler classes

The `Crawler` class uses the `HTMLParser` class to extract information from the website's HTML. The `HTMLParser` class extracts anchor tags, href, and title attributes. The `Crawler` class then crawls the website, extracts temple names, and exports the data to a CSV file using a `utils` module.

## HTMLParser

The `HTMLParser` class is used to extract information from HTML strings. It has the following methods:

### `get_anchor(html: str) -> List[str]`

Returns a list of all anchor tags in the input HTML.

**Parameters:**

`html` (str): The input HTML string.

**Returns**:

`list`: A list of anchor tags in the input HTML.

### `get_href(html: str) -> List[str]`

Returns a list of all href attributes in anchor tags in the input HTML.

**Parameters**:

`html` (str): The input HTML string.

**Returns:**

`list`: A list of href attributes in anchor tags in the input HTML.

### `get_title(html: str) -> List[str]`

Returns a list of all title attributes in anchor tags in the input HTML.

**Parameters:**

`html` (str): The input HTML string.

**Returns:**

`list`: A list of title attributes in anchor tags in the input HTML.

## Crawler

The `Crawler` class is responsible for crawling a website that contains information about temples in Thailand. It has the following methods:

### `__init__(self, HOST: str, root_url: str, provinces: list, parser: HTMLParser) -> None`

The constructor method instantiates the `Crawler` class with the specified parameters.

**Parameters:**

- `HOST` : str - The base URL of the website being crawled.
- `root_url` : str - The URL of the root page of the website being crawled.
- `provinces` : list - A list of the provinces to be crawled.
- `parser` : HTMLParser - An instance of the `HTMLParser` class, used for parsing the HTML of the website.

### `extract_provinces(self, html: str) -> List[Dict[str, str]]`

This method extracts the provinces and their corresponding URLs from the HTML strings.

**Parameters:**

- `html` : str - The HTML strings.

**Returns:**

- `temples` : list - A list of dictionaries containing the title and href of the anchor tags in the HTML.

### `extract_temple_name(self, html: str) -> List[str]`

This method extracts the names of the temples from the HTML of a province page.

**Parameters:**

- `html` : str - The HTML of a province page.

**Returns:**

- `temple_names` : list - A list of the names of the temples.

### `run(self) -> None`

This method runs the crawler by crawling each desired province, extracting the names of the temples in each province, and exporting the collected data to a CSV file.