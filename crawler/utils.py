import csv

def write_string_to_file(string, filename):
    with open(filename, 'w+') as f:
        f.write(string)
        f.close()

def export_csv(data,header, filename, delimiter=','):
    with open(filename, 'w+', encoding='utf-8') as f:
        f.write(delimiter.join(header) + '\n')

        for row in data:
            f.write(delimiter.join(row.values()) + '\n')

        f.close()