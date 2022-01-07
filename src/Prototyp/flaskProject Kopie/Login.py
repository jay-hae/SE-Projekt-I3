import mysql.connector as mariadb


# authorization for user trying to open application
def LoginDB(user, pwd):
    if mariadb.connect(user=user, password=pwd, host='', database=''):
        return 'True'
    else:
        return 'False'


# function to reconnect to db after usr is stored in session
def newConnection():
    return mariadb.connect(user='', password='', host='', database='')