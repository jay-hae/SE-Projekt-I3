import time, helper

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
        payload = return_institutes(result.fetchall())
    cur.close()
    cnxn.close()
    # convert payload to json format and send it back to server
    return jsonify(payload, {'sorting': 'a'})

# Laden des Vertragstyp in den Filter Dropdown
def ag_type_ret():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute('SELECT ID, deu FROM tbl_partnership_type ORDER BY deu')
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
# Laden der Länderliste in den Filter Länder
def all_countries():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute("SELECT de, id FROM tbl_country ORDER BY de")
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
# Laden der Fakultäten in den Filter Fakultäten
def faculty():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute("SELECT ID, deu FROM tbl_faculty ORDER BY deu")
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


# get all data needed for institut modal box; specified inst by ID given from html site
def for_institute_modal(institute_id):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    param_list = (institute_id,)
    cur.callproc('institute_information', param_list)
    payload = []
    for result in cur.stored_results():
        rows = result.fetchall()
        for row in rows:
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
                'pers_mail': row[18],
                'id': institute_id
            }
            payload.append(content)
    cur.close()
    cnxn.close()
    return jsonify(payload)

## Hier muss für das Modal Mentoren Bearbeiten eine Datenbankabfrage erstellt werden
# der Code hier darunter ist nur von for_modal (lädt Daten für Mentor Modal) kopiert.
# get all data needed for mentor modal box; specified mentor by ID given from html site
def for_mentor_modal(mentor_id):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    param_list = (mentor_id,)
    cur.callproc('get_mentor', param_list)
    payload = []
    for result in cur.stored_results():
        rows = result.fetchall()
        for row in rows:
            content = {
                'title': row[0],
                'firstname': row[1],
                'lastname': row[2],
                'gender': row[3],
                'website': row[4],
                'mail': row[5],
                'id': mentor_id
            }
            payload.append(content)
    cur.close()
    cnxn.close()
    return jsonify(payload)


# get mobility agreements referring to institute / partnership and all course restrictions
def get_ma_and_courses(institute):
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
                'partnership_ID': row[1],
                'faculty': row[2],
                'mentor_title': row[3],
                'mentor_firstname': row[4],
                'mentor_lastname': row[5],
                'date_signature': row[6],
                'valid_since': row[7],
                'valid_until': row[8],
                'agreement_inactive': row[9],
                'in_num_mob': row[10],
                'in_num_months': row[11],
                'out_num_mob': row[12],
                'out_num_months': row[13],
                'notes': row[14],
                'mentor_ID': row[15],
                'course_restrictions': []
            }
            agreement = (content['agreement_ID'],)
            cur.callproc('get_ma_restrictions', agreement)
            for results in cur.stored_results():
                for restriction in results:
                    content['course_restrictions'].append({
                        'restriction_ID': restriction[0],
                        'course': restriction[1],
                        'subject_area_code': restriction[2],
                        'incoming': restriction[3],
                        'sub_num_mobility': restriction[4],
                        'sub_num_months': restriction[5]
                    })
            payload.append(content)
    cur.close()
    cnxn.close()
    return jsonify(payload)


def filter_institutes(parameters):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    payload = [] # empty payload to put data in later
    # 0 - country, 1 - faculty, 2 - extern, 3 - active, 4 - agreement type
    parameter_list = (parameters[0], parameters[1], parameters[2], parameters[3], parameters[4])
    print(parameter_list)
    cur.callproc('count_agreements_filter', parameter_list, )
    for result in cur.stored_results():
        payload = return_institutes(result.fetchall())
    print(payload)
    cur.close()
    cnxn.close()
    return jsonify(payload, {'sorting': parameters[5]})


# insert new institute into table
def new_Institute(tuple_col_inst, tuple_val_inst, name, val):
    all_parameters = (name, val)
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    query_parameter = helper.dynamic_querries(tuple_col_inst)
    query = "INSERT INTO tbl_institute (" + query_parameter[0] + ") VALUES (" + query_parameter[1] + ")"
    try:
        insert_parameter = tuple(tuple_val_inst)
        # insert into tbl_institute
        cur.execute(query, insert_parameter)
        cnxn.commit()
        # query for insert into tbl_partnership
        cur.callproc('insert_partnership', all_parameters, )
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


def new_mentor(columns, values):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    query_parameter = helper.dynamic_querries(columns)
    query = "INSERT INTO tbl_mentor (" + query_parameter[0] + ") VALUES(" + query_parameter[1] + ")"
    try:
        print(query)
        print(values)
        """
        insert = tuple(values)
        cur.execute(query, values,)
        cnxn.commit()
        return jsonify({'success': 'true'})"""
    finally:
        cur.close()
        cnxn.close()

# Laden der Länder in die Tabelle auf der Seite Länderübersicht
def return_countries():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute('SELECT de, en, erasmus FROM tbl_country ORDER BY de')
    rows = cur.fetchall()  # zusammenfassen aller Objekte der Datenbankanfrage
    payload = []
    for row in rows:
        content = {
            'de': row[0],
            'en': row[1],
            'er': row[2]
        }
        payload.append(content)
    cnxn.close()
    cur.close()
    return jsonify(payload)


# Laden der Studiengänge in die Tabelle auf der Seite Studiengänge
def return_courses():
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute('SELECT deu, eng FROM tbl_course ORDER BY deu')
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

# Laden der Mentoren in die Tabelle auf der Seite Mentoren
def return_mentor():  # get all mentor information and store on client storage
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    query = """SELECT m.ID, m.faculty_ID, m.active, m.title, m.firstname, m.lastname, m.gender_ID,
                m.homepage, m.email,count(mentor_ID) 
                FROM tbl_mobility_agreement ma 
                JOIN tbl_mentor m  
                ON ma.mentor_ID = m.ID 
                GROUP BY mentor_ID
                ORDER BY m.lastname"""
    cur.execute(query)
    all_mentors = cur.fetchall()
    payload = []
    for mentor in all_mentors:
        display = "Nein"
        if mentor[2] == 1:
            display = "Ja"
        content = {
            'ID': mentor[0],
            'faculty_ID': mentor[1],
            'active': display,
            'title': mentor[3],
            'firstname': mentor[4],
            'lastname': mentor[5],
            'gender_ID': mentor[6],
            'homepage': mentor[7],
            'email': mentor[8],
            'agreements': mentor[9]
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
                GROUP BY m.faculty_ID
                ORDER BY f.deu"""
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


def return_institutes(result_set):
    payload = []
    for result in result_set:
        content = {
            'id': result[0],
            'name': result[1],
            'agreements': result[2],
            'display': result[3]
        }
        payload.append(content)
    return payload


def edit_institute(keys, values, institute):  # institute = institute ID
    parameter = helper.dynamic_querries(keys)
    query_string = helper.create_update_string(keys)
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    query = "UPDATE tbl_institute SET " + query_string[:-1] + " WHERE ID = " + institute
    print(query, tuple(values))
    #cur.execute(query, tuple(values),)
    return jsonify({'status': 'success'})


def edit_mob_agreement(keys, values, agreement):
    parameter = helper.dynamic_querries(keys)
    query = helper.create_update_string(keys)
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    query = "UPDATE tbl_mobility_agreement SET" + query[:-1] + "WHERE ID = " + agreement
    cur.execute(query, tuple(values))
    print(query, tuple(values))
    cnxn.close()
    cur.close()
