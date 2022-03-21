import mysql.connector as mariadb


# authorization for user trying to open application
def LoginDB(user, pwd):
    if mariadb.connect(user='aaapartnerhs', password='a6D6d2c5X0', host='rdbs.rz.htw-dresden.de', database='aaapartnerhs'):
        return 'True'
    else:
        return 'False'


# function to reconnect to db after usr is stored in session
def newConnection():
    return mariadb.connect(user='aaapartnerhs', password='a6D6d2c5X0', host='rdbs.rz.htw-dresden.de', database='aaapartnerhs')