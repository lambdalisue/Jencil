#!/usr/bin/env python
from commands import getoutput

CONFIG_FILE="./CSSSprite"
OUTPUT_FILE="./csssprite.png"

def load_config(filename):
    config = []
    with file(filename, 'r') as f:
        for line in f:
            img, cls = line.split(" ", 1)
            img = img.strip()
            cls = cls.strip()
            config.append((img, cls))
    return config

def montage(config, output):
    num = len(config)
    files = ["\"%s\"" % conf[0] for conf in config]
    files = " ".join(files)
    command = "montage -background transparent -tile %(num)dx1 -geometry"\
        " +0+0 %(files)s %(output)s"
    command = command % {'num': num, 'files': files, 'output': output}
    return getoutput(command)

def display_css(config, offset=16):
    for i, conf in enumerate(config):
        print("%s{ background-position: -%dpx 0px; }" % (conf[1], i*offset))


if __name__ == '__main__':
    config = load_config(CONFIG_FILE)
    montage(config, OUTPUT_FILE)
    display_css(config)
