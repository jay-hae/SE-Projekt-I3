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
                'agreements': i[2]
            }
            payload.append(content)
    cur.close()
    # convert payload to json format and send it back to server
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
    return jsonify(payload)


# insert new institute into table
def new_Institute(inst_inf_dict):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    # create parameter list to insert into tbl_institute
    param_log = (
        inst_inf_dict['country'], inst_inf_dict['eng'], inst_inf_dict['local'], inst_inf_dict['adr'], inst_inf_dict['ws'],
        inst_inf_dict['note'], inst_inf_dict['show'], inst_inf_dict['erasmus']
    )
    print(param_log)


# get all data needed for modal box; specified inst by ID given from html site
def for_modal(institute_id):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    param_list = (institute_id,)
    cur.callproc('get_modal_information', param_list)
    payload = []
    for result in cur.stored_results():
        rows = result.fetchall()
        for row in rows:
            if row[13] == 1:
                gender = 'männlich'
            elif row[13] == 2:
                gender = 'weiblich'
            else:
                gender = 'divers'
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
                'gender': gender,
                'title': row[14],
                'firstname': row[15],
                'lastname': row[16],
                'pers_tel': row[17],
                'pers_mail': row[18]
            }
            payload.append(content)
    return jsonify(payload)