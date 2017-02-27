import glob
import os
import json

SRC_DIR = 'Firmware/'
DST_FILE = 'dataCodeFiles.js'

def main():
    files = []
    with open(DST_FILE, 'w') as fout:
        
        for fn in glob.glob(os.path.join(SRC_DIR, '*')):
            
            with open(fn, 'r') as fin:
                content = fin.read();
                basename = os.path.basename(fn)
                
                files.append({'filename': basename, 'id': basename, 'content': content})
        
        fout.write("var codefiles = ")
        json.dump(files, fout, indent = 4)
        fout.write(";")


if __name__ == '__main__':
    main()