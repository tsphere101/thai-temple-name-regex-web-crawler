import csv

def write_string_to_file(string : str, filename: str):
    with open(filename, 'w+') as f:
        f.write(string)
        f.close()

def export_csv(data : list,header: list, filename:str, delimiter=','):

    # if header is None add each element in data to csv file: 
    if not header :
            
        with open(filename, 'w', encoding='utf-8') as f:
            for d in data:
                f.write(d + '\n')
            f.close()

        return

    # if header is not None add header and each element in data to csv file:
    with open(filename, 'w+', encoding='utf-8') as f:
        f.write(delimiter.join(header) + '\n')

        for row in data:
            f.write(delimiter.join(row.values()) + '\n')

        f.close()