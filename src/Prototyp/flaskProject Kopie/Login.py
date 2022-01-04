import mysql.connector as mariadb


def LoginDB(user, pwd):
    if mariadb.connect(user=user, password=pwd, host='', database=''):
        return 'True'
    else:
        return 'False'


def newConnection():
    return mariadb.connect(user='', password='', host='', database='')
