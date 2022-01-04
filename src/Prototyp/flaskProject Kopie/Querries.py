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
                'name': i[0],
                'agreements': i[1]
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
    inst_inf_dict['note'], inst_inf_dict['show'], inst_inf_dict['erasmus'])
    print(param_log)


# get all data needed for modal box
def for_modal(university_name):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    # get institute id from inst. name (clicked on website)
    cur.execute("SELECT ID FROM tbl_institure WHERE eng = ", (university_name,))
    id = cur.fetchall()
    # get single id extracted from result set
    p_id = id[0]


# execute stored procedure with parameter p_id


def get_smth_changed():
    # check if institute data shown on webpage is up-to-date
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    cur.execute()
