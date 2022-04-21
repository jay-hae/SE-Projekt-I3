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
