def write_to_file(filename, data:str):
    with open(filename, 'w') as f:
        f.write(data)
        f.close()