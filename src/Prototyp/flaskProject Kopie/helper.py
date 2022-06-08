import Login


def dynamic_querries(col):
    all_vals = "%s," * len(col)
    all_cols = ""
    for column in col:
        all_cols += ", " + column
    return [all_cols[2:], all_vals[:-1]]


def create_update_string(values):
    string = ""
    for i in values:
        string += " " + i + " = %s,"
    return string


def checkValidPartnership(partnership_id, institute_id):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    query = f"SELECT ID FROM tbl_partnership WHERE institute_ID = {institute_id} AND partnership_type_ID = {partnership_id}"
    cur.execute(query)
    result_set = cur.fetchall()
    if len(result_set) > 0:
        result_set = str(result_set[0])
        return result_set[1:-2]
    return createPartnership(partnership_id, institute_id)


def createPartnership(partnership_id, institute_id):
    cnxn = Login.newConnection()
    cur = cnxn.cursor()
    params = (institute_id, partnership_id,)
    cur.callproc('create_partnership', params)
    cnxn.commit()
    result_set = cur.fetchall()
    print(result_set)


