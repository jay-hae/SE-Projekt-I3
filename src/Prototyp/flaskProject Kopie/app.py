import json
import os, Login, Querries, helper
#### os : When Python starts, it loads many modules into sys. module.os module is also loaded when Python starts. It assigns its path to the os specific module attribute.
#### Login : imports Login.py File

#### Erklärung Flask: https://flask.palletsprojects.com/en/2.0.x/quickstart/
from flask import Flask, render_template, request, session, url_for, jsonify, send_from_directory
from flask_wtf import CSRFProtect
from werkzeug.utils import redirect

#### Spezialvariable "__name__" =  https://www.pythontutorial.net/python-basics/python-__name__/#:~:text=The%20__name__%20is,file%20associated%20with%20the%20module.
app = Flask(__name__)
app.secret_key = os.urandom(24)


# Login Page, atm login with db credentials
# redirect user to homepage if he is already logged in

#### app.route = We use the route() decorator to tell Flask what URL should trigger our function.
@app.route('/', methods=['GET', 'POST'])
def LoginPage():
    if request.method == 'GET':
        session["usr"] = 'yes'
        return redirect('/homepage/institutes')
    """
    if request.method == 'GET':
        if "usr" in session:
            return redirect(url_for('sql'))
        else:
            return render_template('login.html')
    else:
        session["usr"] = Login.LoginDB(request.form["usr"], request.form["pwd"])
        return redirect(url_for('sql'))
"""


# return of filter objects
@app.route('/get/<name>', methods=['GET'])
def load_filter(name):
    if name == 'institutes':
        return Querries.institutes_ret()
    elif name == 'agreements':
        return Querries.ag_type_ret()
    elif name == 'countries':
        return Querries.all_countries()
    elif name == 'faculties':
        return Querries.faculty()
    else:
        return None


# get data needed for modal
# filtered institute id from website
@app.route('/openModal', methods=['POST'])
def exec_sp():
    return Querries.for_modal(request.form['id'])


# give browser all files that are needed (js files,...)
@app.route('/<string:filename>', methods=['GET'])
def ret_file(filename):
    return send_from_directory('templates', filename)

@app.route('/add/<name>', methods=['POST'])
def new_object(name):
    if name == 'Mentor':
        active = 0
        req = request.form.to_dict()
        columns = []
        values = []
        for key in req:
            if key == 'active':
                active = 1
                break
            # key = dict key, req[key] = value
            columns.append(key)
            values.append(req[key])
        columns.append('active')
        values.append(active)
        Querries.new_mentor(columns, values)
    elif name == 'Institute':
        my_var = request.form.to_dict()
        # for insert into tbl_institute
        col_list_institute = []
        val_list_institute = []
        if "display" not in request.form:
            col_list_institute.append("display")
            val_list_institute.append(0)
        for key in my_var:
            if key != 'partnership_type_ID':
                if my_var[key] != '':
                    if key == 'eng':
                        name = my_var[key]
                    if my_var[key] == 'on':
                        col_list_institute.append(key)
                        val_list_institute.append(int(1))
                    elif my_var[key].isnumeric():
                        val_list_institute.append(int(my_var[key]))
                        col_list_institute.append(key)
                    else:
                        val_list_institute.append(my_var[key])
                        col_list_institute.append(key)
            else:
                val = my_var[key]
        return Querries.new_Institute(col_list_institute, val_list_institute, name, val)
    elif name == 'Agreement':
        agreement_obj = request.form.to_dict()

    elif name == 'Restriction':
        change_restriction = request.form.to_dict()
    else:
        return jsonify({'status': 'unexpected request'})


@app.route('/filterInstitute', methods=['POST'])
def handle_filter():
    if request.method == 'POST':
        my_list = request.form.to_dict()
        if my_list['filter_shown'] == 'y':
            my_list['filter_shown'] = "1"
        elif my_list['filter_shown'] == 'n':
            my_list['filter_shown'] = "0"
        if my_list['filter_activity'] == 'y':
            my_list['filter_shown'] = "0" #in DB -> 0 = aktiv, 1 = inaktiv
        elif my_list['filter_shown'] == 'n':
            my_list['filter_shown'] = "1"
        var = ['%' if i == 'none' else i for i in my_list.values()]
        return Querries.filter_institutes(var)


@app.route('/editInstitute', methods=['POST'])
def edit_inst():
    print(request.form.to_dict())
    return jsonify({'success': 'true'})


@app.route('/changeData/<name>', methods=['POST'])
def changes(name):
    if name == 'addInstitute':
        print(request.form.to_dict())
    elif name == 'updateInstitute':
        x = request.form.to_dict()
        inst = x['ID']
        x.pop('ID')
        Querries.edit_institute(x.keys(), x.values(), inst)
    return redirect(url_for('LoginPage'))


@app.route('/homepage/<name>', methods=['GET', 'POST'])
def hp_file(name):
    if name == 'mentor':
        return render_template('mentor.html')
    elif name == 'countries':
        return render_template('country.html')
    elif name == 'courses':
        return render_template('course.html')
    elif name == 'faculties':
        return render_template('faculty.html')
    elif name == 'institutes':
        return render_template('institutes.html')


@app.route('/loader/<name>', methods=['GET', 'POST']) # <name> : URL-Parameter kann übergeben
def ret_js(name):
    if name == 'mentor':
        return Querries.return_mentor()
    elif name == 'country':
        return Querries.return_countries()
    elif name == 'course':
        return Querries.return_courses()
    elif name == 'faculty':
        return Querries.return_faculties()
    elif name == 'mobAgreements':
        return Querries.get_ma_and_courses(request.form['id'])
    else:
        return jsonify('answer: Unexpected Request')


@app.route('/logout', methods=['GET'])
def logout():
    if "usr" in session:
        session.pop(session["usr"], None)
    return redirect(url_for('LoginPage'))


if __name__ == '__main__':
    app.run(debug=True) # bei Fehlern in der VM debug=True durch host='0.0.0.0' ersetzen
