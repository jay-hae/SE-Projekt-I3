import Login
from flask import jsonify


def statement(Query):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute(Query)


def institutes_ret():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.callproc('count_agreements')
    payload = []
    for result in cur.stored_results():
        x = result.fetchall()
        for i in x:
            content = {
                'name': i[0],
                'agreements': i[1]
            }
            payload.append(content)
    cur.close()
    return jsonify(payload)


def all_countries():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute("SELECT de, id FROM tbl_country")
    x = cur.fetchall()
    payload = []
    for i in x:
        content = {
            'country': i[0],
            'id' : i[1]
        }
        payload.append(content)
    cur.close()
    return jsonify(payload)


def faculty():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute("SELECT ID, deu FROM tbl_faculty")
    x = cur.fetchall()
    payload = []
    for i in x:
        content = {
            'id': i[0],
            'fac': i[1]
        }
        payload.append(content)
    cur.close()
    return jsonify(payload)


def new_Institute(inst_inf_dict):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    #create parameter list to insert into tbl_institute

def for_modal(university_name):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute("SELECT ID FROM tbl_institure WHERE eng = ", (university_name,))
    id = cur.fetchall()
    param = id[0]

