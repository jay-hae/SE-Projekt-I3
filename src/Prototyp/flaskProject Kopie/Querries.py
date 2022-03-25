import time

import Login
from flask import jsonify


# get all institutes saved in tbl_institutes
def institutes_ret():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    # execute stored procedure
    cur.callproc('count_agreements')
    payload = []
    # with result create an object that iterates through cur.stored_results() -> only one stored result
    for result in cur.stored_results():
        # get all results from sp call by reference it to 'x'
        x = result.fetchall()
        # iterate through all results in x and create a dict content in every loop
        # append it to payload, where all objects created out of result list x are stored
        for i in x:
            content = {
                'id': i[0],
                'name': i[1],
                'agreements': i[2],
                'display': i[3]
            }
            payload.append(content)
    cur.close()
    cnxn.close()
    # convert payload to json format and send it back to server
    return jsonify(payload, {'sorting': 'a'})


def ag_type_ret():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute('SELECT ID, deu FROM tbl_partnership_type')
    x = cur.fetchall()
    payload = []
    for i in x:
        content = {
            'ID': i[0],
            'ps_type': i[1]
        }
        payload.append(content)
    cur.close()
    cnxn.close()
    return jsonify(payload)


# get all country names + ID's from country table
# same logic as in institutes_ret() func
def all_countries():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute("SELECT de, id FROM tbl_country")
    x = cur.fetchall()
    payload = []
    for i in x:
        content = {
            'country': i[0],
            'id': i[1]
        }
        payload.append(content)
    cur.close()
    cnxn.close()
    return jsonify(payload)


# get all faculties existing in htw
# same logic as in institutes_ret() func
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
    cnxn.close()
    return jsonify(payload)


# get all data needed for modal box; specified inst by ID given from html site
def for_modal(institute_id):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    param_list = (institute_id,)
    cur.callproc('institute_information', param_list)
    payload = []
    for result in cur.stored_results():
        rows = result.fetchall()
        for row in rows:
            print(row)
            content = {
                'country': row[0],
                'eng': row[1],
                'local': row[2],
                'adr': row[3],
                'website': row[4],
                'notes': row[5],
                'display': row[6],
                'ec': row[7],
                'dep': row[8],
                'tel': row[9],
                'mail': row[10],
                'off_website': row[11],
                'function': row[12],
                'gender': row[13],
                'title': row[14],
                'firstname': row[15],
                'lastname': row[16],
                'pers_tel': row[17],
                'pers_mail': row[18]
            }
            payload.append(content)
    cur.close()
    cnxn.close()
    return jsonify(payload)


# get mobility agreements referring to institute / partnership
def get_ma(institute):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    param_list = (institute,)
    cur.callproc('get_ma', param_list)
    payload = []
    for result in cur.stored_results():
        rows = result.fetchall()
        for row in rows:
            content = {
                'agreement_ID': row[0],
                'faculty': row[1],
                'mentor_ID': row[2],
                'gender_ID': row[3],
                'mentor_active': row[4],
                'from_valid': row[5],
                'until_valid': row[6],
                'agreement_inactive': row[7],
                'number_incoming': row[8],
                'months_incoming': row[9],
                'number_outgoing': row[10],
                'months_outgoing': row[11],
                'note': row[12]
            }
            payload.append(content)
    cur.close()
    cnxn.close()
    return jsonify(payload)


#  get all courses related to single mobility agreement
def get_ma_x_course(agreement):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    param_list = (agreement,)
    cur.callproc('get_ma_x_course', param_list)
    payload = []
    for result in cur.stored_results():
        rows = result.fetchall()
        for row in rows:
            content = {
                'ag_x_course_id': row[0],
                'course': row[1],
                'faculty': row[2],
                'sac': row[3], #subject area code
                'num_incoming': row[4],
                'subnum_mob': row[5],
                'subnum_months': row[6]
            }
            payload.append(content)
    cur.close()
    cnxn.close()
    return jsonify(payload)


def filter_institutes(parameters):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    payload = []
    parameter_list = (parameters[0], parameters[1], parameters[2], parameters[3], parameters[4])
    cur.callproc('count_agreements_filter', parameter_list, )
    x = cur.fetchall()
    for result in cur.stored_results():
        x = result.fetchall()
        for i in x:
            content = {
                'id': i[0],
                'name': i[1],
                'agreements': i[2],
                'display': i[3]
            }
            payload.append(content)
    cur.close()
    cnxn.close()
    return jsonify(payload, {'sorting': parameters[5]})


    # insert new institute into table
def new_Institute(tuple_col_inst, tuple_val_inst, name, val):
    params = (name, val)
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    x = "%s, "
    x = x*len(tuple_val_inst)
    a = ""
    for columns in tuple_col_inst:
        a += ", "+columns
    print(a[2:])
    print(x[:-2])
    print(tuple_val_inst)
    query = "INSERT INTO tbl_institute (" + a[2:] + ") VALUES (" + x[:-2] + ")"
    try:
        newL = tuple(tuple_val_inst)
        # insert into tbl_institute
        cur.execute(query, newL)
        cnxn.commit()
        # query for insert into tbl_partnership
        cur.callproc('insert_partnership', params,)
        cnxn.commit()
        for result in cur.stored_results():
            x = result.fetchall()
            for i in x:
                print(x)
        cur.close()
        cnxn.close()
        return jsonify({'success': 'True'})
    finally:
        cur.close()
        cnxn.close()


def return_countries():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute('SELECT de, en, erasmus FROM tbl_country')
    x = cur.fetchall()
    payload = []
    for row in x:
        content = {
            'de': row[0],
            'en': row[1],
            'er': row[2]
        }
        payload.append(content)
    cnxn.close()
    cur.close()
    return jsonify(payload)


def return_courses():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute('SELECT deu, eng FROM tbl_course')
    x = cur.fetchall()
    payload = []
    for row in x:
        content = {
            'de': row[0],
            'eng': row[1]
        }
        payload.append(content)
    cnxn.close()
    cur.close()
    return jsonify(payload)


def return_mentor():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    query = """SELECT m.ID, m.firstname, m.lastname, m.active, count(mentor_ID) 
                FROM tbl_mobility_agreement ma 
                JOIN tbl_mentor m  
                ON ma.mentor_ID = m.ID 
                GROUP BY mentor_ID
                ORDER BY m.firstname"""
    cur.execute(query)
    all_mentors = cur.fetchall()
    payload = []
    for mentor in all_mentors:
        if mentor[3] == 1:
            display = "Ja"
        else:
            display = "Nein"
        content = {
            'ID': mentor[0],
            'f_name': mentor[1],
            'l_name': mentor[2],
            'act': display,
            'amount': mentor[4]
        }
        payload.append(content)
    cnxn.close()
    cur.close()
    return jsonify(payload)


def return_faculties():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    query = """SELECT f.deu, f.eng, COUNT(m.faculty_ID) 
                FROM tbl_mobility_agreement m
                JOIN tbl_faculty f 
                ON f.ID = m.faculty_ID
                GROUP BY m.faculty_ID"""
    cur.execute(query)
    faculties = cur.fetchall()
    payload = []
    for fac in faculties:
        content = {
            'de': fac[0],
            'eng': fac[1],
            'agreements': fac[2]
        }
        payload.append(content)
    cnxn.close()
    cur.close()
    return jsonify(payload)
