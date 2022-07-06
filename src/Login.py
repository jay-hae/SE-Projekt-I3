import mysql.connector as mariadb


# authorization for user trying to open application
def LoginDB(user, pwd):
    '''
    Nutzer beim Öffnen der Anwendung mit Datenbank Information autorisiert
    '''
    logged = False
    try:
        if mariadb.connect(user=user, password=pwd, host='rdbs.rz.htw-dresden.de', database='aaapartnerhs'):
            logged = True
    finally:
        return logged


# function to reconnect to db after user is stored in session
def newConnection():
    '''
    Funktion zum erneuten Verbinden mit der Datenbank, 
    nachdem der Benutzerdaten in der Session gespeichert wurde
    '''
    return mariadb.connect(user='aaapartnerhs', password='a6D6d2c5X0', host='rdbs.rz.htw-dresden.de', database='aaapartnerhs')
