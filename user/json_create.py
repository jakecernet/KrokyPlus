import json
import os

file_f=open("food_log.txt", "r")

file=file_f.readlines()
file_f.close()

new=open("output.json", "w")
new.write("[")
for index, line in enumerate(file, start=0):
    new.write("{\n")
    new.write('"id":')
    new.write(str(index+1))
    new.write(",\n")
    new.write('"name":')
    new.write('"')
    new.write(line.strip())
    new.write('"')
    new.write("\n")
    new.write("},\n")

new.write("]")

new.close()

    
    
