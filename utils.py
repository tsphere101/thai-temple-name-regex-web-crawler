import csv

def write_string_to_file(string, filename):
    with open(filename, 'w+') as f:
        f.write(string)
        f.close()

def export_csv(data, filename):
    pass