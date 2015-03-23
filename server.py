#!/usr/bin/env python
import os
import sys



def run_command(command):
    '''
    Runs a shell command
    '''

    print command

    err = os.system(command)

    if err != 0:
        print 'ERROR %s exited with %d' % (command, err)
        exit(err)
    return err


if __name__ == "__main__":



    args= ' '.join(sys.argv[1:])
    print args
    run_command('cd dist; %s ' % args)

    # while True:
    #
    #     try:
    #         run_command('cd dist;python -m SimpleHTTPServer  %s ' % args)
    #     except:
    #         pass
